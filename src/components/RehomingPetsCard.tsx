import {
  Box,
  Image,
  Text,
  Center,
  useBreakpointValue,
  Card,
  Grid,
  Button,
  AspectRatio,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import usePetsByUserId from "../hooks/usePetsByUserId";

const placeholderImageUrl = "https://via.placeholder.com/150";

interface Props {
  userId: string;
}

const RehomingPetsCard = ({ userId }: Props) => {
  const { pets } = usePetsByUserId({ userId });

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

  const seeMoreWidth = useBreakpointValue({
    base: "40px",
    md: "50px",
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
    return (
      <Card
        mt={10}
        w="full"
        h="120px"
        align="center"
        justify="center"
        shadow="lg"
        borderRadius="3xl"
      >
        <Text fontSize="lg" fontWeight={600} color="gray.400">
          Sorry, you do not have rehoming pets yet...
        </Text>
      </Card>
    );
  }

  return (
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
      <Grid templateColumns={gridTemplateColumns} gap={4} pr={seeMoreWidth}>
        {pets.slice(0, itemCount).map((pet) => (
          <AspectRatio key={pet.id} ratio={1} w="100%">
            <Box
              position="relative"
              rounded="xl"
              transition="transform 0.2s"
              _hover={{
                transform: "scale(1.03)",
              }}
            >
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
                p={2}
              >
                <Text fontSize="sm">{pet.name}</Text>
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
        rightIcon={<ChevronRightIcon />}
        colorScheme="gray"
        variant="ghost"
        aria-label="See more"
        position="absolute"
        right={-6}
        top="50%"
        transform="translateY(-50%) rotate(90deg)"
      >
        See more
      </Button>
    </Box>
  );
};

export default RehomingPetsCard;
