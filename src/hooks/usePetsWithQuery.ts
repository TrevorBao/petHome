import { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, query as firestoreQuery, onSnapshot, QuerySnapshot, DocumentData, QueryConstraint } from 'firebase/firestore';
import { PetProps } from './usePets';

interface UsePetsWithQueryResponse {
  pets: PetProps[];
  error: string;
  isLoading: boolean;
}

const usePetsWithQuery = (queryConstraints: QueryConstraint[]): UsePetsWithQueryResponse => {
  const [pets, setPets] = useState<PetProps[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const petCollectionRef = collection(db, "petInfo");
    const q = firestoreQuery(petCollectionRef, ...queryConstraints);

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
  }, [queryConstraints]);

  return { pets, error, isLoading };
}

export default usePetsWithQuery;
