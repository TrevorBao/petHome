import { Container, Heading, SimpleGrid, Flex } from "@chakra-ui/react";
import ProfileCard from "../components/ProfileCard";
import useUsers from "../hooks/useUsers";
import RehomingPetsCard from "../components/RehomingPetsCard";
import { useParams } from "react-router-dom";
import RehomedPetsCard from "../components/RehomedPetsCard";
import AdoptedPetsCard from "../components/AdoptedPetsCard";
import RehomingCounts from "../components/RehomingCounts";
import RehomedCounts from "../components/RehomedCounts";
import AdoptedCounts from "../components/AdoptedCounts";
import AdoptingCounts from "../components/AdoptingCounts";

const UserProfilePage = () => {
  const { ownerUser } = useUsers();
  const { id } = useParams();

  return (
    <Container minH="100vh" minW="full" px={10} py={5}>
      <Container minW="full" alignContent="center" alignItems="center">
        <Heading mb={7}>Profile</Heading>
        <SimpleGrid w="100%" columns={{ base: 1, md: 2 }} spacing={10}>
          {ownerUser && <ProfileCard user={ownerUser} />}
          <Flex direction="column" w="100%">
            {id && <RehomingCounts userId={id} />}
            {id && <RehomedCounts userId={id} />}
            {id && <AdoptedCounts userId={id} />}
            {id && <AdoptingCounts userId={id} />}
          </Flex>
        </SimpleGrid>
        {id && <AdoptedPetsCard userId={id} />}
        {id && <RehomingPetsCard userId={id} />}
        {id && <RehomedPetsCard userId={id} />}
      </Container>
    </Container>
  );
};

export default UserProfilePage;
