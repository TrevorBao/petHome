import { Box } from "@chakra-ui/react";
import MyAdoptionProcess from "../components/MyAdoptionProcess";
import useUsers from "../hooks/useUsers";

const AdoptionPage = () => {
  const { currentUser } = useUsers();
  if (currentUser) {
    return (
      <Box w="100%" minH="100vh">
        <MyAdoptionProcess userId={currentUser.userId} />
      </Box>
    );
  }
};

export default AdoptionPage;
