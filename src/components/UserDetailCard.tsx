import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import useUsers, { UserProps } from "../hooks/useUsers";
import { PetProps } from "../hooks/usePets";
import { ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useCheckForExistingChat from "../hooks/useCheckForExistingChat";
import useCreateChat from "../hooks/useCreateChat";

interface Props {
  user?: UserProps;
  pet: PetProps;
}

const UserDetailCard = ({ user, pet }: Props) => {
  const navigate = useNavigate();
  const { currentUser } = useUsers();
  const createChat = useCreateChat();
  const { chatId, isLoading } = useCheckForExistingChat({
    currentUser,
    otherUserId: pet.userId,
  });

  const handleContactClick = async () => {
    if (isLoading) {
      console.log(isLoading);
      return;
    }
    if (pet.userId === currentUser?.userId) return;
    if (currentUser) {
      if (chatId) {
        navigate(`/chat/${currentUser.userId}/${chatId}`);
      } else {
        const newChatId = await createChat(currentUser?.userId, pet.userId);
        navigate(`/chat/${currentUser.userId}/${newChatId}`);
      }
    }
  };

  return (
    <Card
      p={6}
      bg="linear-gradient(135deg, #7B61FF 0%, #9B82FF 100%)"
      style={{
        boxShadow:
          "0 10px 15px -3px rgba(114, 70, 222, 0.4), 0 4px 6px -2px rgba(114, 70, 222, 0.15)",
      }}
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="filled"
      borderRadius="3xl"
      justifyContent={{ md: "space-between" }}
      mb={10}
    >
      <Flex>
        <Flex gap={4} pr={5} pl={1}>
          <Avatar
            src={user?.avatarUrl}
            name={`${user?.userName}`}
            size="lg"
            onClick={() => navigate(`/user/${pet.userId}`)}
            cursor="pointer"
          />
        </Flex>
        <Box flex="1" pl={{ md: 4 }}>
          <Heading size="md" color="white">
            Contact {user?.userName} to adopt {pet.name}
          </Heading>
          <Text fontSize="sm" mt={2.5} color="white">
            {user?.firstName} {user?.lastName}
          </Text>
          <Button
            bg="#f0b24f"
            variant="solid"
            size="sm"
            color="white"
            mt={4}
            borderRadius="xl"
            _hover={{ bg: "#e5a641" }}
            onClick={handleContactClick}
            isLoading={isLoading}
          >
            <Icon as={ChatIcon} mr={2} />
            Contact
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};

export default UserDetailCard;
