import { Box, Text } from "@chakra-ui/react";
import { IMessage } from "../hooks/useChat";

interface Props {
  message: IMessage;
  isCurrentUser: (senderId: string) => boolean;
  getSenderName: (senderId: string) => string;
}

const ChatBubble = ({ message, isCurrentUser, getSenderName }: Props) => {
  return (
    <Box
      alignSelf={isCurrentUser(message.senderId) ? "flex-end" : "flex-start"}
      padding="2"
      borderRadius="lg"
      background={isCurrentUser(message.senderId) ? "blue.500" : "gray.200"}
      color={isCurrentUser(message.senderId) ? "white" : "black"}
    >
      <Text fontWeight="bold">{getSenderName(message.senderId)}</Text>
      <Text>{message.text}</Text>
    </Box>
  );
};

export default ChatBubble;
