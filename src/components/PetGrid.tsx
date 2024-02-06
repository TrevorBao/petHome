import { SimpleGrid, useToast } from "@chakra-ui/react";
import usePets from "../hooks/usePets";
import PetCard from "./PetCard";
import PetCardContainer from "./PetCardContainer";
import PetCardSkeleton from "./PetCardSkeleton";

const PetGrid = () => {
  const { pets, error, isLoading } = usePets();
  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ];
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
        skeletons.map((skeleton) => (
          <PetCardContainer>
            <PetCardSkeleton key={skeleton} />
          </PetCardContainer>
        ))}
      {pets.map((pet) => (
        <PetCardContainer>
          <PetCard key={pet.id} pet={pet} />
        </PetCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default PetGrid;
