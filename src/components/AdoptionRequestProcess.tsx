import { Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useFetchRehoming from "../hooks/useFetchRehoming";
import AdoptionRequestCard from "./AdoptionRequestCard";

interface Props {
  userId: string;
}

const AdoptionRequestProcess = ({ userId }: Props) => {
  const { pets, isLoading } = useFetchRehoming({ userId });

  if (isLoading) {
    return <Spinner thickness="4px" speed="0.65s" size="3xl" />;
  }

  if (pets.length === 0) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        minH="60vh"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold">
          You have no adoption requests.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center" w="full">
      <SimpleGrid
        w="full"
        columns={{ base: 1, lg: 2 }}
        spacing="50px"
        my={8}
        mx={12}
      >
        {pets.map((pet) => (
          <AdoptionRequestCard key={pet.id} pet={pet} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default AdoptionRequestProcess;
