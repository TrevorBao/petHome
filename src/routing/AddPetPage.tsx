import { Center, useBreakpointValue } from "@chakra-ui/react";
import CreatePetInfo from "../components/CreatePetInfo";

const AddPetPage = () => {
  const formWidth = useBreakpointValue({
    base: "80vw",
    md: "80vw",
    lg: "70vw",
    xl: "60vw",
  });
  return (
    <Center>
      <Center w={formWidth} my={8}>
        <CreatePetInfo />
      </Center>
    </Center>
  );
};

export default AddPetPage;
