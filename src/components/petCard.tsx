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
        flexGrow={1}
        height="100%"
      >
        <AspectRatio ratio={3 / 2} mb={2}>
          <Image
            src={pet.imageUrls?.[0] || placeholder}
            alt={`Image of ${pet.name}, a ${pet.sex} ${pet.breed} ${pet.type}`}
            objectFit="cover"
            borderRadius="2xl"
          />
        </AspectRatio>
        <CardBody pb={0}>
          <Heading size="lg" pb={3}>
            {pet.breed}
          </Heading>
          <Text pb={2}>{pet.age}</Text>
          <Text>{pet.name}</Text>
        </CardBody>
        <Button
          as={NavLink}
          to={`/${pet.id}`}
          width="full"
          colorScheme="linkedin"
          variant="solid"
          borderRadius="xl"
        >
          More
        </Button>
      </Card>
    </div>
  );
};

export default PetCard;
