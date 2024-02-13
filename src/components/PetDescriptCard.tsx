import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { PetProps } from "../hooks/usePets";

interface Props {
  pet: PetProps;
}

const PetDescriptCard = ({ pet }: Props) => {
  if (pet.detail)
    return (
      <Card
        overflow="hidden"
        variant="elevated"
        padding={10}
        borderRadius="3xl"
        shadow="lg"
        mb={10}
        bg="#FEFEFE"
        position="relative"
      >
        <CardBody>
          <Heading size="xl">Description</Heading>
          <Text mt={5}>{pet.detail}</Text>
        </CardBody>
      </Card>
    );
  else return;
};

export default PetDescriptCard;
