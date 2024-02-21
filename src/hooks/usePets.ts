import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, or, where } from 'firebase/firestore';
import useUsers, { UserProps } from './useUsers';
import { useParams } from 'react-router-dom';


export interface PetProps {
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
    userId: string;
  }

  interface UsePetsResponse {
    pets: PetProps[];
    error: string;
    isLoading: boolean;
    user?: UserProps;
    pet?: PetProps;
  }

const usePets = (searchText?: string): UsePetsResponse => {
    const [pets, setPets] = useState<PetProps[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const {users} = useUsers();

    const params = useParams();
    const petId = params.id;
    const pet = pets.find((pet) => pet.id === petId);
    const user = users.find((user) => user.userId === pet?.userId);
    
    useEffect(() => {
        const petCollectionRef = collection(db, "petInfo");
        let queryRef;

        if (searchText) {
          const lowerSearchText = searchText.toLowerCase();
          const typeQuery = where('type', '==', lowerSearchText);
          const breedQuery = where('breed', '==', lowerSearchText);
          queryRef = query(petCollectionRef, or(typeQuery, breedQuery));
        } else {
          queryRef = query(petCollectionRef);
        }


        const unsubscribe = onSnapshot(
          queryRef,
          (snapshot) => {
            const petsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }) as PetProps);
            setPets(petsData);
            setIsLoading(false);
          },
          (err) => {
            setError(err.message);


            
            setIsLoading(false);
          }
        );
    
        return () => unsubscribe();
      }, [searchText]);

      return { pets, error, isLoading, user, pet };
}

export default usePets;