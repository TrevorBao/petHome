
import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const usePasswordReset = () => {
  const [email, setEmail] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const toast = useToast();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      onOpen();
      toast({
        title: 'Success',
        description: 'Check your email for reset instructions',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      let errorMessage;
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = 'An unknown error occurred';
      }
      toast({
        title: 'Error Sending Reset Email',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { email, setEmail, handleResetPassword, isOpen, onClose, navigate };
};

export default usePasswordReset;
