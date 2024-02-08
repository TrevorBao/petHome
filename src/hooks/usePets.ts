import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';

export interface Pet {
    id: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    weight: string;
    sex: string;
    isSpayed: string;
    health?: string;
    allergy?: string;
    detail?: string;
    imageUrls?: string[];
  }

  interface UsePetsResponse {
    pets: Pet[];
    error: string;
    isLoading: boolean;
  }

const usePets = (): UsePetsResponse => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const petCollectionRef = collection(db, "petInfo");
        const unsubscribe = onSnapshot(
          petCollectionRef,
          (snapshot: QuerySnapshot<DocumentData>) => {
            const petsData: Pet[] = snapshot.docs.map((doc) => ({
              ...(doc.data() as Pet),
              id: doc.id,
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
      }, []);
      return { pets, error, isLoading };
}

export default usePets;