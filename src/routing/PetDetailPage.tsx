import { useParams } from "react-router-dom";
import PetDetailCard from "../components/PetDetailCard";
import usePets from "../hooks/usePets";
import { Container, Heading } from "@chakra-ui/react";
import UserDetailCard from "../components/UserDetailCard";
import useUsers from "../hooks/useUsers";
import PetInfoCard from "../components/PetInfoCard";

const PetDetailPage = () => {
  const { pets, isLoading: isPetsLoading, error: petsError } = usePets();
  const { users, isLoading: isUsersLoading, error: usersError } = useUsers();
  const params = useParams();
  const petId = params.id;

  const pet = pets.find((pet) => pet.id === petId);
  const user = users.find((user) => user.userId === pet?.userId);

  return pet ? (
    <Container minH="100vh" minW="full" px={10} py={5}>
      <Heading mb={7}>Information of {pet.name}</Heading>
      <PetDetailCard pet={pet} />
      <UserDetailCard user={user} pet={pet} />
      <PetInfoCard pet={pet} />
    </Container>
  ) : (
    <div>Pet not found</div>
  );
};

export default PetDetailPage;
