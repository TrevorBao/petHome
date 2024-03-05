import { Card } from "@chakra-ui/react";
import { PetProps } from "../hooks/usePets";
import PetImageSlider from "./PetImageSlider";
import PetInfo from "./PetInfo";

interface Props {
  pet: PetProps;
}

const PetDetailCard = ({ pet }: Props) => {
  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="elevated"
      padding={10}
      borderRadius="3xl"
      shadow="lg"
      mb={10}
      bg="#FEFEFE"
    >
      <PetImageSlider pet={pet} />
      <PetInfo pet={pet} />
    </Card>
  );
};

export default PetDetailCard;
