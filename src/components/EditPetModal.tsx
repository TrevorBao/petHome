import {
  Image,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea,
  Wrap,
  WrapItem,
  AspectRatio,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import useEditPet from "../hooks/useEditPet";
import { PetProps } from "../hooks/usePets";
import ConfirmationPopover from "./ConfirmationPopover";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pet: PetProps;
}

const EditPetModal = ({ isOpen, onClose, pet }: Props) => {
  const {
    formData,
    handleFileChange,
    handleSubmit,
    fileInputRef,
    handleChange,
    handleImageRemove,
    handleNumber,
  } = useEditPet({ pet, onClose });

  const renderImagePreviews = () => {
    return (
      <Wrap spacing="20px">
        {formData?.imageUrls?.map((url: string, index: number) => (
          <WrapItem key={url}>
            <AspectRatio ratio={1} w="130px" h="130px">
              <Box position="relative">
                <Image
                  src={url}
                  alt={`Pet Image ${index + 1}`}
                  objectFit="cover"
                  w="full"
                  h="full"
                  borderRadius="md"
                />
                <IconButton
                  icon={<CloseIcon />}
                  aria-label="Delete image"
                  position="absolute"
                  top="1"
                  right="1"
                  size="xs"
                  onClick={() => handleImageRemove(index)}
                />
              </Box>
            </AspectRatio>
          </WrapItem>
        ))}
      </Wrap>
    );
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Pet Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Heading size="md">General Information:</Heading>
            <FormControl id="pet-name" isRequired>
              <FormLabel>Name of the Pet</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="pet-type" isRequired>
              <FormLabel>Type of the Pet</FormLabel>
              <Input
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="pet-breed" isRequired>
              <FormLabel>Breed/Species of the Pet</FormLabel>
              <Input
                type="text"
                value={formData.breed}
                placeholder="e.g. Siberian Husky"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="pet-age" isRequired>
              <FormLabel>Age of the Pet</FormLabel>
              <Input
                type="text"
                value={formData.age}
                placeholder="e.g. 3 month"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="pet-weight" isRequired>
              <FormLabel>Weight of the Pet (kg)</FormLabel>
              <NumberInput
                step={0.01}
                precision={2}
                value={formData.weight}
                onChange={handleNumber}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl id="pet-sex" isRequired>
              <FormLabel>Sex of the Pet</FormLabel>
              <Select
                value={formData.sex}
                placeholder="please select an option"
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>

            <Heading size="md">Health:</Heading>
            <FormControl id="pet-spay" isRequired>
              <FormLabel>Spaying/Neutering</FormLabel>
              <Select
                value={formData.isSpayed}
                placeholder="please select an option"
                onChange={handleChange}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Select>
            </FormControl>
            <FormControl id="pet-health">
              <FormLabel>Health Status</FormLabel>
              <Input
                type="text"
                value={formData.health}
                placeholder="e.g. Any known health issues or signs of previous injuries"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="pet-allergy">
              <FormLabel>Allergies</FormLabel>
              <Input
                type="text"
                value={formData.allergy}
                placeholder="e.g. Allergies"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="pet-detail">
              <FormLabel>Detail Information</FormLabel>
              <Textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
              />
            </FormControl>
            <Stack direction="row">
              {renderImagePreviews()}
              <IconButton
                ml={3}
                size="sm"
                icon={<AddIcon />}
                aria-label="Add image"
                onClick={() => fileInputRef.current?.click()}
              />
            </Stack>
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="#5c946e"
            color="white"
            _hover={{ bg: "#4e8560" }}
            onClick={handleSubmit}
            mr={3}
          >
            Update
          </Button>
          <ConfirmationPopover onClose={onClose} pet={pet} />
          <Button variant="ghost" onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPetModal;
