import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import useEditProfile from "../hooks/useEditProfile";
import { UserProps } from "../hooks/useUsers";
import { NavLink } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserProps;
}

const EditProfileModal = ({ isOpen, onClose, user }: Props) => {
  const {
    formData,
    handleFileChange,
    handleSubmit,
    fileInputRef,
    handleChange,
    handleModalClose,
  } = useEditProfile({ user, onClose });

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={handleModalClose}
        isOpen={isOpen}
        size={{ base: "sm", lg: "md", "2xl": "lg" }}
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Stack direction="row" spacing={4} align="center">
                <Avatar src={formData.avatarUrl} size="xl" />
                <Button
                  colorScheme="blackalpha"
                  variant="link"
                  leftIcon={<EditIcon />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload New Image
                </Button>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </Stack>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="gender" mt={4}>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Choose your gender"
                  name="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="notTell">Prefer not to tell</option>
                </Select>
              </FormControl>

              <FormControl id="birthday" mt={4}>
                <FormLabel>Birthday</FormLabel>
                <Input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="address" mt={4}>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="postcode" mt={4}>
                <FormLabel>Postcode</FormLabel>
                <Input
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="job" mt={4}>
                <FormLabel>Job</FormLabel>
                <Input
                  placeholder="Enter your job"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                />
              </FormControl>
              <Stack direction="row" spacing={4} align="center"></Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#5c946e"
              color="white"
              _hover={{ bg: "#4e8560" }}
              mr={3}
              onClick={handleSubmit}
            >
              Update
            </Button>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button ml={3} variant="ghost" as={NavLink} to="/auth/reset">
              Reset Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
