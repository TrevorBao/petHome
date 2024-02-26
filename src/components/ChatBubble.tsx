import { Avatar, Box, Stack, Text } from "@chakra-ui/react";
import { IMessage } from "../hooks/useChat";

interface Props {
  message: IMessage;
  isCurrentUser: (senderId: string) => boolean;
  getSenderAvatar: (senderId: string) => string;
}

const ChatBubble = ({ message, isCurrentUser, getSenderAvatar }: Props) => {
  const isCurrent = isCurrentUser(message.senderId);
  const bubbleBg = isCurrent ? "blue.400" : "gray.200";
  const bubbleColor = isCurrent ? "white" : "black";

  return (
    <Stack
      direction="row"
      spacing={2}
      alignSelf={isCurrent ? "flex-end" : "flex-start"}
      justify={isCurrent ? "flex-end" : "flex-start"}
      width="100%"
    >
      <Avatar
        src={getSenderAvatar(message.senderId)}
        order={isCurrent ? 1 : 0}
      />
      <Box
        py={2}
        px={4}
        my={1}
        maxWidth={{ base: "65%", md: "75%" }}
        borderRadius="xl"
        color={bubbleColor}
        background={bubbleBg}
      >
        <Text>{message.text}</Text>
      </Box>
    </Stack>
  );
};

export default ChatBubble;
