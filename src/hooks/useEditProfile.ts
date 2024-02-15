import { useState, useRef } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { collection, query, getDocs, updateDoc, where, doc } from "firebase/firestore";
import { UserProps } from './useUsers';
import { useToast } from '@chakra-ui/react';

interface Props {
  user: UserProps;
  onClose: () => void;
}

const useEditProfile = ({ user, onClose }: Props) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    userName: user.userName,
    address: user.address,
    postCode: user.postCode,
    birthday: user.birthday,
    gender: user.gender,
    job: user.job,
    avatarUrl: user.avatarUrl,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleModalClose = () => {
    resetFormData();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const result = reader.result as string;
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatarUrl: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAvatar = async () => {
    if (file) {
      const storageRef = ref(
        storage,
        `users/${user.userId}/avatar-${user.userName}-${user.userId}.png`
      );
      await uploadBytes(storageRef, file);
      const avatarUrl = await getDownloadURL(storageRef);
      return avatarUrl;
    }
    return user.avatarUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let avatarUrl = formData.avatarUrl;
    if (file) {
      avatarUrl = await updateAvatar();
    }

    try {
      const userCollectionRef = collection(db, "userInfo");
      const userDocRef = query(
        userCollectionRef,
        where("userId", "==", auth?.currentUser?.uid)
      );
      const userSnapshot = await getDocs(userDocRef);
      if (!userSnapshot.empty) {
        const userDocData = userSnapshot.docs[0];
        await updateDoc(doc(db, "userInfo", userDocData.id), {
          userName: formData.userName,
          address: formData.address,
          postCode: formData.postCode,
          birthday: formData.birthday,
          gender: formData.gender,
          job: formData.job,
          avatarUrl: avatarUrl,
        });
      }

      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleModalClose();
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      userName: user.userName,
      address: user.address,
      postCode: user.postCode,
      birthday: user.birthday,
      gender: user.gender,
      job: user.job,
      avatarUrl: user.avatarUrl,
    });
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    handleChange,
    file,
    formData,
    setFile,
    setFormData,
    handleFileChange,
    updateAvatar,
    handleSubmit,
    handleModalClose,
    fileInputRef,
  };
};

export default useEditProfile;