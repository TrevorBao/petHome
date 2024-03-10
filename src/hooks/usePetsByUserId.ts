import { where } from 'firebase/firestore';
import usePetsWithQuery from './usePetsWithQuery';
import { useEffect, useState } from 'react';

interface Props {
    userId: string;
}

const usePetsByUserId = ({userId}: Props) => {
  const { pets: rehomePets, isLoading: rehomeLoading } = usePetsWithQuery([
    where("userId", "==", userId),
    where("isAdopted", "==", false),
    where("isAdoptionInProgress", "==", false)
  ]);

  const { pets: adoptingPets, isLoading: adoptingLoading } = usePetsWithQuery([
    where("userId", "==", userId),
    where("isAdopted", "==", false),
    where("isAdoptionInProgress", "==", true)
  ]);

  const { pets: adoptedPets, isLoading: adoptedLoading } = usePetsWithQuery([
    where("adopterId", "==", userId),
    where("isAdopted", "==", true)
  ]);

  const { pets: rehomedPets, isLoading: rehomedLoading } = usePetsWithQuery([
    where("userId", "==", userId),
    where("isAdopted", "==", true)
  ]);

  // State to hold the counts
  const [petsCount, setPetsCount] = useState({
    rehomeCount: 0,
    adoptedCount: 0,
    rehomedCount: 0,
    adoptionProgressCount: 0,
  });

  useEffect(() => {
    if (!rehomeLoading && !adoptedLoading && !rehomedLoading) {
      const rehomeCount = rehomePets.length;
      const adoptedCount = adoptedPets.length;
      const rehomedCount = rehomedPets.length;
      const adoptionProgressCount = adoptingPets.length;

      setPetsCount({ rehomeCount, adoptedCount, rehomedCount, adoptionProgressCount });
    }
  }, [rehomeLoading, adoptingLoading, adoptedLoading, rehomedLoading, rehomePets, adoptedPets, rehomedPets, adoptingPets]);
  
    return { rehomePets, rehomeLoading, rehomedPets, rehomedLoading, adoptedPets, adoptedLoading, petsCount };
  }

export default usePetsByUserId;
