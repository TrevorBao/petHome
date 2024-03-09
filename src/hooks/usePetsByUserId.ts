import { where } from 'firebase/firestore';
import usePetsWithQuery from './usePetsWithQuery';

interface Props {
    userId: string;
}

const usePetsByUserId = ({userId}: Props) => {
  const { pets: rehomePets, isLoading: rehomeLoading } = usePetsWithQuery([
    where("userId", "==", userId),
    where("isAdopted", "==", false),
    where("isAdoptionInProgress", "==", false)
  ]);

  const { pets: adoptedPets, isLoading: adoptedLoading } = usePetsWithQuery([
    where("adopterId", "==", userId),
    where("isAdopted", "==", true)
  ]);

  const { pets: rehomedPets, isLoading: rehomedLoading } = usePetsWithQuery([
    where("userId", "==", userId),
    where("isAdopted", "==", true)
  ]);
  
    return { rehomePets, rehomeLoading, rehomedPets, rehomedLoading, adoptedPets, adoptedLoading };
  }

export default usePetsByUserId;
