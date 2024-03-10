import { Container, Heading } from "@chakra-ui/react";
import ProfileCard from "../components/ProfileCard";
import useUsers from "../hooks/useUsers";
import RehomingPetsCard from "../components/RehomingPetsCard";
import { useParams } from "react-router-dom";
import RehomedPetsCard from "../components/RehomedPetsCard";
import AdoptedPetsCard from "../components/AdoptedPetsCard";
import RehomingCounts from "../components/RehomingCounts";
import RehomedCounts from "../components/RehomedCounts";

const UserProfilePage = () => {
  const { ownerUser } = useUsers();
  const { id } = useParams();

  return (
    <Container minH="100vh" minW="full" px={10} py={5}>
      <Container minW="full" alignContent="center" alignItems="center">
        <Heading mb={7}>Profile</Heading>
        {ownerUser && <ProfileCard user={ownerUser} />}
        {id && <RehomingCounts userId={id} />}
        {id && <RehomedCounts userId={id} />}
        {id && <AdoptedPetsCard userId={id} />}
        {id && <RehomingPetsCard userId={id} />}
        {id && <RehomedPetsCard userId={id} />}
      </Container>
    </Container>
  );
};

export default UserProfilePage;
