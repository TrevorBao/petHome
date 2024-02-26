import { Box, VStack } from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { IMessage } from "../hooks/useChat";

interface Props {
  messages: IMessage[];
  getSenderName: (senderId: string) => string;
  isCurrentUser: (senderId: string) => boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
  scrollBarStyle: { [key: string]: unknown };
}

const ChatMessages = ({
  messages,
  getSenderName,
  isCurrentUser,
  chatEndRef,
  scrollBarStyle,
}: Props) => {
  return (
    <Box
      flex="1"
      overflowY="auto"
      px={8}
      pt={6}
      sx={scrollBarStyle}
      width="full"
    >
      <VStack align="stretch" spacing="4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isCurrentUser={isCurrentUser}
            getSenderName={getSenderName}
          />
        ))}
        <div ref={chatEndRef} />
      </VStack>
    </Box>
  );
};

export default ChatMessages;
