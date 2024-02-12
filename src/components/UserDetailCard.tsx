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
import { UserProps } from "../hooks/useUsers";
import { PetProps } from "../hooks/usePets";
import { ChatIcon } from "@chakra-ui/icons";

interface Props {
  user: UserProps;
  pet: PetProps;
}

const UserDetailCard = ({ user, pet }: Props) => {
  return (
    <Card
      p={6}
      bg="linear-gradient(135deg, #7B61FF 0%, #9B82FF 100%)"
      shadow="lg"
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="filled"
      borderRadius="3xl"
      justifyContent={{ md: "space-between" }}
    >
      <Flex>
        <Flex gap={4} pr={5} pl={1}>
          <Avatar src={user.avatarUrl} name={`${user.userName}`} size="lg" />
        </Flex>
        <Box flex="1" pl={{ md: 4 }}>
          <Heading size="md" color="white">
            Contact {user.userName} to adopt {pet.name}
          </Heading>
          <Text fontSize="sm" mt={2.5} color="white">
            {user.email}
          </Text>
          <Button
            bg="#FACD85"
            variant="solid"
            size="sm"
            color="white"
            mt={4}
            borderRadius="xl"
            _hover={{ bg: "#FBC671" }}
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