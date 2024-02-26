import { VStack } from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { IMessage } from "../hooks/useChat";

interface Props {
  messages: IMessage[];
  getSenderAvatar: (senderId: string) => string;
  isCurrentUser: (senderId: string) => boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages = ({
  messages,
  getSenderAvatar,
  isCurrentUser,
  chatEndRef,
}: Props) => {
  return (
    <VStack align="stretch" spacing="4" mt={5} px={5}>
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
          isCurrentUser={isCurrentUser}
          getSenderAvatar={getSenderAvatar}
        />
      ))}
      <div ref={chatEndRef} />
    </VStack>
  );
};

export default ChatMessages;
