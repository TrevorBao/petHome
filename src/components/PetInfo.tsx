import { Stack, CardBody, Heading, Text } from "@chakra-ui/react";
import usePets, { PetProps } from "../hooks/usePets";
import AdoptConfirmationPopover from "./AdoptConfirmationPopover";
import { useToggleAdoption } from "../hooks/useToggleAdoption";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface PetInfoProps {
  pet: PetProps;
}

const PetInfo = ({ pet }: PetInfoProps) => {
  const { isPetOwner } = usePets();
  const navigate = useNavigate();
  const { toggleAdoption, isLoading: isAdoptionToggling } = useToggleAdoption();
  const [isAdoptionInProgress, setIsAdoptionInProgress] = useState(
    pet.isAdoptionInProgress
  );

  const handleAdopt = () => {
    const adopterId = auth.currentUser?.uid;
    if (adopterId && !isAdoptionToggling) {
      toggleAdoption(pet.id, adopterId, isAdoptionInProgress)
        .then(() => {
          setIsAdoptionInProgress(!isAdoptionInProgress);
          navigate("/adopt");
        })
        .catch((error) => {
          console.error("Error toggling adoption status:", error);
        });
    }
  };
  return (
    <Stack
      order={{ base: 0, md: 0 }}
      spacing={{ base: 0, md: 4 }}
      direction="column"
      width="full"
    >
      <CardBody>
        <Heading size="xl">{pet.name}</Heading>

        <Text pt="3">
          {pet.name} is a {pet.sex} {pet.breed} {pet.type.toUpperCase()}, it is{" "}
          {pet.age} old, with a weight of {pet.weight} kg. {pet.name} is a
          beloved member of the family, bringing joy and companionship to all
          who meet it.
        </Text>
      </CardBody>
      {!isPetOwner && (
        <AdoptConfirmationPopover
          isAdoptionInProgress={isAdoptionInProgress}
          onAdopt={handleAdopt}
        />
      )}
    </Stack>
  );
};

export default PetInfo;
