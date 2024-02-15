import { Container, Heading } from "@chakra-ui/react";
import ProfileCard from "../components/ProfileCard";
import useUsers from "../hooks/useUsers";

const UserProfilePage = () => {
  const { ownerUser } = useUsers();

  return (
    <Container minH="100vh" minW="full" px={10} py={5}>
      <Heading mb={7}>Profile</Heading>
      {ownerUser && <ProfileCard user={ownerUser} />}
    </Container>
  );
};

export default UserProfilePage;
