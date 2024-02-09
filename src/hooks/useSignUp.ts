import { useState } from 'react';
import { auth, db, storage } from '../firebase';
import {
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  sendEmailVerification,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

export interface UserDetails {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  postCode: string;
  gender: string;
  birthday: string;
  job: string;
}

const useSignUp = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    postCode: "",
    gender: "",
    birthday: "",
    job: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setView(!view);


  const handleInputChange = (event: { target: { name: never; value: never; }; }) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleAuthError = (error: unknown) => {
    let message;
    if (error instanceof FirebaseError) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    toast({
      title: "Authentication Error",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAuthSuccess = () => {
    navigate("/pet");
  };

  const userCollectionRef = collection(db, "userInfo");

  const uploadAvatar = async () => {
    try {
      const defaultAvatarPath =
        "gs://pet-home-1c0a2.appspot.com/avatar-default.png";
      const avatarRef = ref(storage, defaultAvatarPath);
      const url = await getDownloadURL(avatarRef);
      const response = await fetch(url);
      const blob = await response.blob();
      const newAvatarPath = `users/${auth?.currentUser?.uid}/avatar-${userDetails.username}-${auth?.currentUser?.uid}.png`;
      const newAvatarRef = ref(storage, newAvatarPath);
      const snapshot = await uploadBytes(newAvatarRef, blob);
      const newUrl = await getDownloadURL(snapshot.ref);
      return newUrl;
    } catch (error) {
      toast({
        title: "Avatar Setting Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const signUp = async () => {
    // Check if all required fields are filled
    const requiredFields = {
      username: userDetails.username,
      email: userDetails.email,
      password: password,
      confirmPassword: confirmPassword,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      gender: userDetails.gender,
      birthday: userDetails.birthday,
      address: userDetails.address,
      postCode: userDetails.postCode,
    };
    const allRequiredFilled = Object.values(requiredFields).every((value) =>
      value.trim()
    );
    if (!allRequiredFilled) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all the required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        password
      );
      await sendEmailVerification(userCredential.user);

      const avatarUrl = await uploadAvatar();

      if (!avatarUrl) {
        throw new Error("Failed to upload avatar and get URL");
      }

      await addDoc(userCollectionRef, {
        address: userDetails.address,
        avatarUrl: avatarUrl,
        birthday: userDetails.birthday,
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        gender: userDetails.gender,
        job: userDetails.job,
        postCode: userDetails.postCode,
        userName: userDetails.username,
        userId: auth?.currentUser?.uid,
      });

      toast({
        title: "Account Created",
        description:
          "Your account has been created successfully. A verification email has been sent to you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      handleAuthSuccess();
    } catch (err) {
      handleAuthError(err);
    }
  };

  return {
    userDetails,
    setUserDetails,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    tabIndex,
    setTabIndex,
    show,
    setShow,
    view,
    setView,
    handleClick,
    handleClick2,
    handleInputChange,
    handleAuthError,
    handleAuthSuccess,
    uploadAvatar,
    signUp,
  };
};

export default useSignUp;