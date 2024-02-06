import { SimpleGrid, useToast } from "@chakra-ui/react";
import usePets from "../hooks/usePets";
import PetCard from "./PetCard";

const PetGrid = () => {
  const { pets, error } = usePets();
  const toast = useToast();

  if (error) {
    toast({
      title: "Error fetching the data.",
      description: `${error}`,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5, "2xl": 7 }}
      padding="20px"
      spacing={10}
    >
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </SimpleGrid>
  );
};

export default PetGrid;
