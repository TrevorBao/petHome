import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  IconButton,
  HStack,
  Box,
  Container,
} from "@chakra-ui/react";
import { PetProps } from "../hooks/usePets";
import imagePlaceholder from "../assets/image-placeholder.jpg";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import useImageSlider from "../hooks/useImageSlider";

interface Props {
  pet: PetProps;
}

const PetDetailCard = ({ pet }: Props) => {
  const {
    currentImageIndex,
    hasMultipleImages,
    isOpen,
    onOpen,
    onClose,
    nextImage,
    prevImage,
    setCurrentImageIndex,
    openPreview,
  } = useImageSlider(pet.imageUrls);

  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="elevated"
      padding={10}
      borderRadius="3xl"
      shadow="lg"
      mb={10}
    >
      <Container
        order={{ base: 1, md: 1 }}
        position="relative"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        maxW={{ base: "100%", lg: "530px" }}
      >
        {hasMultipleImages && isOpen && (
          <>
            <IconButton
              aria-label="Previous image"
              icon={<ChevronLeftIcon />}
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              onClick={prevImage}
              zIndex="overlay"
              size="sm"
            />
            <IconButton
              aria-label="Next image"
              icon={<ChevronRightIcon />}
              position="absolute"
              right="0"
              top="50%"
              transform="translateY(-50%)"
              onClick={nextImage}
              zIndex="overlay"
              size="sm"
            />
            <HStack
              justify="center"
              position="absolute"
              bottom="8px"
              w="full"
              spacing={2}
            >
              {pet.imageUrls?.map((_, index) => (
                <Box
                  key={index}
                  p="1"
                  bg={currentImageIndex === index ? "gray.400" : "gray.200"}
                  borderRadius="full"
                  as="button"
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </HStack>
          </>
        )}
        <Image
          overflow="hidden"
          src={pet.imageUrls?.[currentImageIndex] || imagePlaceholder}
          alt={`${pet.name}`}
          onClick={() =>
            openPreview(pet.imageUrls?.[currentImageIndex] || imagePlaceholder)
          }
          borderRadius="3xl"
        />
      </Container>
      <Stack
        order={{ base: 0, md: 0 }}
        spacing={4}
        direction="column"
        width="full"
      >
        <CardBody>
          <Heading size="xl">{pet.name}</Heading>

          <Text pt="3">
            {pet.name} is a {pet.sex} {pet.breed} {pet.type.toUpperCase()}, it
            is {pet.age} old, with a weight of {pet.weight} kg. {pet.name} is a
            beloved member of the family, bringing joy and companionship to all
            who meet it.
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default PetDetailCard;
