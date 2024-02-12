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
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="white"
        padding={5}
        m={4}
      >
        <AspectRatio ratio={1.5}>
          <Image
            src={pet.imageUrls?.[0] || placeholder}
            alt={`Image of ${pet.name}, a ${pet.sex} ${pet.breed} ${pet.type}`}
            objectFit="cover"
            borderRadius="lg"
          />
        </AspectRatio>
        <CardBody p={4}>
          <Heading size="lg">{pet.breed}</Heading>
          <Text>{pet.age}</Text>
          <Text>{pet.name}</Text>
        </CardBody>
        <Button
          as={NavLink}
          variant="solid"
          colorScheme="blue"
          width="full"
          mt="auto"
          to={`/pet/${pet.id}`}
        >
          More
        </Button>
      </Card>
    </div>
  );
};

export default PetCard;
