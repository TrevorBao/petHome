import { useDisclosure } from '@chakra-ui/react';

const useEditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return {
    isModalOpen: isOpen,
    openModal: onOpen,
    closeModal: onClose,
  };
};

export default useEditProfileModal;
