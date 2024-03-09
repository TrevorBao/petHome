import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { auth } from '../firebase';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
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


  return {
    email,
    setEmail,
    password,
    setPassword,
    setRememberMe,
    show,
    handleClick,
    signIn,
    handleNavigation,
  };
};

export default useSignIn;