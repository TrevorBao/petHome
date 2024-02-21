import PetDetailCard from "../components/PetDetailCard";
import usePets from "../hooks/usePets";
import { Container, Heading } from "@chakra-ui/react";
import UserDetailCard from "../components/UserDetailCard";
import useUsers from "../hooks/useUsers";
import PetInfoCard from "../components/PetInfoCard";
import PetDescriptCard from "../components/PetDescriptCard";

const PetDetailPage = () => {
  const { pet, user } = usePets();
  const { currentUser } = useUsers();

  return pet ? (
    <Container minH="100vh" minW="full" px={10} py={5}>
      <Heading mb={7}>Information of {pet.name}</Heading>
      <PetDetailCard pet={pet} />
      {currentUser && <UserDetailCard user={user} pet={pet} />}
      <PetInfoCard pet={pet} />
      <PetDescriptCard pet={pet} />
    </Container>
  ) : (
    <div>Pet not found</div>
  );
};

export default PetDetailPage;
