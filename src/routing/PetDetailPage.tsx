import { useParams } from "react-router-dom";
import PetDetailCard from "../components/PetDetailCard";
import usePets from "../hooks/usePets";

const PetDetailPage = () => {
  const { pets, error, isLoading } = usePets();
  const params = useParams();
  const petId = params.id;

  const pet = pets.find((pet) => pet.id === petId);

  return pet ? <PetDetailCard pet={pet} /> : <div>Pet not found</div>;
};

export default PetDetailPage;
