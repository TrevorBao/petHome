import { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, query, where, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { PetProps } from './usePets';

interface Props {
    userId: string;
}

interface UsePetsByUserIdResponse {
    pets: PetProps[];
    error: string;
    isLoading: boolean;
  }

const usePetsByUserId = ({userId}: Props) : UsePetsByUserIdResponse => {
    const [pets, setPets] = useState<PetProps[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
  
      const petCollectionRef = collection(db, "petInfo");
      const q = query(petCollectionRef, where("userId", "==", userId), where("isAdopted", "==", false), where("isAdoptionInProgress", "==", false));
      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const petsData: PetProps[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<PetProps, 'id'>),
          }));
          setPets(petsData);
          setIsLoading(false);
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
        }
      );
  
      return () => unsubscribe();
    }, [userId]);
  
    return { pets, error, isLoading };
  }

export default usePetsByUserId;
