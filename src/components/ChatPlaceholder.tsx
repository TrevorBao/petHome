import Logo from "../assets/logowithtext.svg";
import { Box, Center, Text } from "@chakra-ui/react";

const ChatPlaceholder = () => {
  return (
    <Center h="94vh" w="full" flexDirection="column">
      <Box textAlign="center">
        <img
          src={Logo}
          alt="Logo"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "10px",
            width: "50%",
            height: "auto",
          }}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Start a conversation
        </Text>
        <Text color="gray.500">Select a person to chat with.</Text>
      </Box>
    </Center>
  );
};

export default ChatPlaceholder;
