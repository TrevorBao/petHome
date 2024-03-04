import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, or, where, orderBy } from 'firebase/firestore';
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

type OrderByDirection = 'asc' | 'desc';
export interface SortOption {
  field: string;
  direction: OrderByDirection;
}

export const SORT_OPTIONS = {
  NAME_ASC: { field: 'name', direction: 'asc' as OrderByDirection },
  NAME_DESC: { field: 'name', direction: 'desc' as OrderByDirection },
  DATE_ADDED_ASC: { field: 'createTime', direction: 'asc' as OrderByDirection },
  DATE_ADDED_DESC: { field: 'createTime', direction: 'desc' as OrderByDirection },
};

const usePets = (searchText?: string, sortOption: SortOption = SORT_OPTIONS.NAME_ASC): UsePetsResponse => {
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
        const petRef = query(petCollectionRef, where("isAdopted", "==", false))
        let queryRef;

        if (searchText) {
          const lowerSearchText = searchText.toLowerCase();
          const typeQuery = where('type', '==', lowerSearchText);
          const breedQuery = where('breed', '==', lowerSearchText);
          queryRef = query(petRef, or(typeQuery, breedQuery), orderBy(sortOption.field, sortOption.direction));
        } else {
          queryRef = query(petRef, orderBy(sortOption.field, sortOption.direction));
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
      }, [searchText, sortOption]);

      return { pets, error, isLoading, user, pet };
}

export default usePets;