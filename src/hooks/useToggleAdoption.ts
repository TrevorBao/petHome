import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import { useToast } from '@chakra-ui/react';

interface UseToggleAdoptionResponse {
  toggleAdoption: (petId: string, adopterId: string, isAdoptionInProgress: boolean) => Promise<void>;
  isLoading: boolean;
}

export const useToggleAdoption = (): UseToggleAdoptionResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const toggleAdoption = async (petId: string, adopterId: string, isAdoptionInProgress: boolean) => {
    setIsLoading(true);
    const petRef = doc(db, 'petInfo', petId);

    try {
      await updateDoc(petRef, {
        isAdoptionInProgress: !isAdoptionInProgress,
        adopterId: isAdoptionInProgress ? null : adopterId
      });
    } catch (err) {
        toast({
            title: "Toggle Error",
            description: "Failed to toggle the button, try again",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
    } finally {
      setIsLoading(false);
      toast({
        title: "Send Adoption Request Successfully",
        description: "Your request has been sent to the shelter. Tip: Ensure your home is ready with essential pet supplies and familiarize yourself with adoption regulations.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return {
    toggleAdoption,
    isLoading,
  };
};
