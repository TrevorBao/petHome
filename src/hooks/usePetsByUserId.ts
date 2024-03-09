import { where } from 'firebase/firestore';
import usePetsWithQuery from './usePetsWithQuery';

interface Props {
    userId: string;
}

const usePetsByUserId = ({userId}: Props) => {
  const { pets, error, isLoading } = usePetsWithQuery([
    where("userId", "==", userId),
    where("isAdopted", "==", false),
    where("isAdoptionInProgress", "==", false)
  ]);
  
    return { pets, error, isLoading };
  }

export default usePetsByUserId;
