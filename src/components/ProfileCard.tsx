import {
  Avatar,
  Box,
  Card,
  Heading,
  IconButton,
  Text,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { UserProps } from "../hooks/useUsers";
import DetailItem from "./DetailItem";
import { EditIcon } from "@chakra-ui/icons";
import useIsOwner from "../hooks/useIsOwner";
import useEditProfileModal from "../hooks/useEditProfileModal";
import EditProfileModal from "./EditProfileModal";

interface Props {
  user: UserProps;
}

const ProfileCard = ({ user }: Props) => {
  const { isOwner } = useIsOwner();
  const { isModalOpen, openModal, closeModal } = useEditProfileModal();

  return (
    <>
      <Card
        align="center"
        rounded="3xl"
        boxShadow="lg"
        p={10}
        maxW={{ base: "80vw", md: "sm", xl: "lg", "3xl": "2xl" }}
        w="full"
      >
        {isOwner && (
          <>
            <Tooltip
              label="Edit Profile"
              fontSize="md"
              closeDelay={300}
              hasArrow
            >
              <IconButton
                icon={<EditIcon />}
                aria-label="Edit Profile"
                position="absolute"
                top={2}
                right={2}
                variant="ghost"
                rounded="2xl"
                onClick={openModal}
              />
            </Tooltip>
          </>
        )}

        <Box position="relative" display="flex" justifyContent="center">
          <Avatar
            size="2xl"
            src={user.avatarUrl}
            name={`${user.firstName} ${user.lastName}`}
          />
        </Box>
        <Heading size="2xl">{user.userName}</Heading>
        <Text fontSize="lg" color="gray.500">
          {user.firstName} {user.lastName}
        </Text>

        {isOwner && (
          <VStack spacing={3} width="100%" px={4} align="stretch" mt={5}>
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Gender" value={user.gender} />
            <DetailItem label="Address" value={user.address} />
            <DetailItem label="Postcode" value={user.postCode} />
          </VStack>
        )}
      </Card>
      <EditProfileModal isOpen={isModalOpen} onClose={closeModal} user={user} />
    </>
  );
};

export default ProfileCard;
