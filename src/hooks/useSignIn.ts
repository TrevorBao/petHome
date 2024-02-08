// useSignIn.ts
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { auth, googleprovider } from '../firebase';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { To, useNavigate } from 'react-router-dom';

const useSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const handleAuthError = () => {
    toast({
      title: "Sign In Failed",
      description: "Invalid Email or Password",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAuthSuccess = () => {
    navigate("/");
  };

  const handleNavigation = (to: To) => {
    navigate(to);
  };

  const signIn = async () => {
    try {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess();
    } catch (error) {
      handleAuthError();
    }
  };

  const signInWithGoogle = async () => {
    try {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithPopup(auth, googleprovider);
      handleAuthSuccess();
    } catch (error) {
      handleAuthError();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    setRememberMe,
    show,
    handleClick,
    signIn,
    signInWithGoogle,
    handleNavigation,
  };
};

export default useSignIn;