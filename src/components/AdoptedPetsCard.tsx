import {
  Box,
  Image,
  Text,
  Center,
  useBreakpointValue,
  Grid,
  Button,
  AspectRatio,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import usePetsByUserId from "../hooks/usePetsByUserId";
import { useState } from "react";
import EditPetModal from "./EditPetModal";
import { PetProps } from "../hooks/usePets";

const placeholderImageUrl = "https://via.placeholder.com/150";

interface Props {
  userId: string;
}

const AdoptedPetsCard = ({ userId }: Props) => {
  const { adoptedPets: pets } = usePetsByUserId({ userId });
  const [selectedPet, setSelectedPet] = useState<PetProps | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onClose } = useDisclosure();

  const itemCount =
    useBreakpointValue({
      base: 2,
      sm: 3,
      md: 5,
      lg: 6,
      xl: 7,
      "2xl": 10,
      "3xl": 15,
    }) || 0;

  const toggleExpandedView = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayedItemCount = isExpanded ? pets.length : itemCount;

  const seeMoreWidth = useBreakpointValue({
    base: "25px",
    md: "30px",
  });

  const gridTemplateColumns =
    useBreakpointValue({
      base: "repeat(2, 1fr)",
      sm: "repeat(3, 1fr)",
      md: "repeat(5, 1fr)",
      lg: "repeat(6, 1fr)",
      xl: "repeat(7, 1fr)",
      "2xl": "repeat(10, 1fr)",
      "3xl": "repeat(15, 1fr)",
    }) || "repeat(2, 1fr)";

  if (pets.length === 0) {
    return;
  }

  return (
    <>
      <Box
        w="full"
        bg="white"
        shadow="lg"
        borderRadius="3xl"
        overflow="hidden"
        mt={10}
        p={6}
        position="relative"
      >
        <Text fontWeight="600" fontSize="xl" mb={5}>
          Adopted Pets
        </Text>
        <Grid templateColumns={gridTemplateColumns} gap={4} pb={seeMoreWidth}>
          {pets.slice(0, displayedItemCount).map((pet) => (
            <AspectRatio key={pet.id} ratio={1} w="100%">
              <Box key={pet.id} position="relative" rounded="xl">
                <Image
                  src={pet.imageUrls?.[0] || placeholderImageUrl}
                  alt={pet.name}
                  objectFit="cover"
                  w="full"
                  h="full"
                />
                <Center
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  bg="blackAlpha.600"
                  color="white"
                  p={1}
                >
                  <Text fontSize="xs">{pet.name}</Text>
                </Center>
              </Box>
            </AspectRatio>
          ))}
          {Array.from({ length: itemCount - pets.length }).map((_, index) => (
            <AspectRatio key={`placeholder-${index}`} ratio={1} w="100%">
              <Box bg="white" />
            </AspectRatio>
          ))}
        </Grid>

        <Button
          colorScheme="gray"
          variant="ghost"
          aria-label={isExpanded ? "See less" : "See more"}
          position="absolute"
          size="sm"
          left="50%"
          bottom="0"
          transform="translateX(-50%)"
          onClick={toggleExpandedView}
          mb={2}
        >
          {isExpanded ? "See less" : "See more"}
          <Box
            ml={1}
            as="span"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
            transformOrigin="center"
            transition="transform 0.3s ease-in-out"
            transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
          >
            <ChevronDownIcon />
          </Box>
        </Button>
      </Box>
      {selectedPet && (
        <EditPetModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedPet(null);
          }}
          pet={selectedPet}
        />
      )}
    </>
  );
};

export default AdoptedPetsCard;
