import { NavLink } from "react-router-dom";
import placeholder from "../assets/image-placeholder.jpg";
import { PetProps } from "../hooks/usePets";
import {
  Image,
  Heading,
  Text,
  Button,
  AspectRatio,
  Card,
  CardBody,
} from "@chakra-ui/react";

interface Props {
  pet: PetProps;
}

const PetCard = ({ pet }: Props) => {
  return (
    <div>
      <Card
        variant="filled"
        borderRadius="3xl"
        overflow="hidden"
        backgroundColor="white"
        shadow="lg"
        padding={7}
        m={4}
      >
        <AspectRatio ratio={1.5}>
          <Image
            src={pet.imageUrls?.[0] || placeholder}
            alt={`Image of ${pet.name}, a ${pet.sex} ${pet.breed} ${pet.type}`}
            objectFit="cover"
            borderRadius="2xl"
          />
        </AspectRatio>
        <CardBody p={4}>
          <Heading size="lg">{pet.breed}</Heading>
          <Text>{pet.age}</Text>
          <Text>{pet.name}</Text>
        </CardBody>
        <Button
          as={NavLink}
          to={`/pet/${pet.id}`}
          mt="auto"
          width="full"
          bg="#9B82FF"
          color="white"
          variant="solid"
          borderRadius="xl"
          _hover={{ bg: "#7246DE" }}
        >
          More
        </Button>
      </Card>
    </div>
  );
};

export default PetCard;
