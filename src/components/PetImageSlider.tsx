import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Container, HStack, IconButton, Image } from "@chakra-ui/react";
import imagePlaceholder from "../assets/image-placeholder.jpg";
import useImageSlider from "../hooks/useImageSlider";
import { PetProps } from "../hooks/usePets";

interface Props {
  pet: PetProps;
}

const PetImageSlider = ({ pet }: Props) => {
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
        cursor="pointer"
      />
    </Container>
  );
};

export default PetImageSlider;
