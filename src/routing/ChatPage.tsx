// ChatPage.jsx
import { VStack } from "@chakra-ui/react";
import ChatInputField from "../components/ChatInputField";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import useChat from "../hooks/useChat";

const ChatPage = () => {
  const {
    newMessage,
    setNewMessage,
    messages,
    handleSubmit,
    getSenderName,
    isCurrentUser,
    chatEndRef,
    opponentUser,
  } = useChat();

  const scrollBarStyle = {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  return (
    <VStack width="100%" height="90vh">
      {opponentUser && <ChatHeader opponentUserName={opponentUser.userName} />}
      <ChatMessages
        messages={messages}
        getSenderName={getSenderName}
        isCurrentUser={isCurrentUser}
        chatEndRef={chatEndRef}
        scrollBarStyle={scrollBarStyle}
      />
      <ChatInputField
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSubmit={handleSubmit}
      />
    </VStack>
  );
};

export default ChatPage;
