import { where } from 'firebase/firestore';
import usePetsWithQuery from './usePetsWithQuery';
import useUsers from './useUsers';

interface Props {
    userId: string;
}

const useFetchAdoption = ({userId}: Props) => {
  const { pets, error: petsError, isLoading: petsLoading } = usePetsWithQuery([
    where("adopterId", "==", userId),
    where("isAdopted", "==", false),
    where("isAdoptionInProgress", "==", true)
  ]);
  

  const { users, error: usersError, isLoading: usersLoading } = useUsers();
  
  const enhancedPets = pets.map((pet) => {
    const petUser = users.find((user) => user.userId === pet.userId);
    const petAdopter = users.find((user) => user.userId === pet.adopterId);
    return {
      ...pet,
      petUser: petUser || null,
      petAdopter: petAdopter || null
    };
  });

  const isLoading = petsLoading || usersLoading;
  const error = petsError || usersError;

  return { pets: enhancedPets, error, isLoading };
  }

export default useFetchAdoption;
