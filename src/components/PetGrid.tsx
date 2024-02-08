import { SimpleGrid, useToast } from "@chakra-ui/react";
import usePets from "../hooks/usePets";
import PetCard from "./PetCard";
import PetCardContainer from "./PetCardContainer";
import PetCardSkeleton from "./PetCardSkeleton";

const PetGrid = () => {
  const { pets, error, isLoading } = usePets();
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
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="15px"
      spacing={10}
    >
      {isLoading &&
        Array.from({ length: 21 }, (_, index) => (
          <PetCardContainer key={index}>
            <PetCardSkeleton />
          </PetCardContainer>
        ))}
      {pets.map((pet) => (
        <PetCardContainer key={pet.id}>
          <PetCard pet={pet} />
        </PetCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default PetGrid;
