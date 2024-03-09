import {
  AspectRatio,
  Avatar,
  Box,
  Flex,
  Text,
  Image,
  Center,
  Badge,
} from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";
import { PetProps as BasePetProps } from "../hooks/usePets";
import { UserProps } from "../hooks/useUsers";
import CancelConfirmation from "./CancelConfirmation";
import { useToggleAdoption } from "../hooks/useToggleAdoption";

interface PetProps extends BasePetProps {
  petUser: UserProps | null;
  petAdopter: UserProps | null;
}

interface Props {
  pet: PetProps;
}

const MyAdoptionCard = ({ pet }: Props) => {
  const placeholderImageUrl = "https://via.placeholder.com/150";
  const { declineAdoption } = useToggleAdoption();

  return (
    <Box
      w="100%"
      bg="white"
      shadow="lg"
      borderRadius="3xl"
      overflow="hidden"
      pt={10}
      pb={8}
      px={16}
      position="relative"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex direction="column" align="center" gap={1}>
          <Avatar src={pet.petAdopter?.avatarUrl} size="lg" />
          <Text fontSize="md" fontWeight={600}>
            {pet.petAdopter?.userName}
          </Text>
          <Badge colorScheme="yellow">Adopting</Badge>
        </Flex>

        <AspectRatio key={pet.id} ratio={1} w="126px">
          <Box key={pet.id} position="relative" rounded="35%">
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

        <Flex direction="column" align="center" gap={1}>
          <Avatar src={pet.petUser?.avatarUrl} size="lg" />
          <Text fontSize="md" fontWeight={600}>
            {pet.petUser?.userName}
          </Text>
          {pet.isAdoptionInProgress && <BeatLoader size={11} color="blue" />}
        </Flex>
      </Flex>
      <CancelConfirmation declineAdoption={() => declineAdoption(pet.id)} />
    </Box>
  );
};

export default MyAdoptionCard;
