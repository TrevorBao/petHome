import { Grid, GridItem } from "@chakra-ui/react";
import ChatInputField from "./ChatInputField";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import useChat from "../hooks/useChat";

const ChatRoom = () => {
  const {
    newMessage,
    setNewMessage,
    messages,
    handleSubmit,
    getSenderAvatar,
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
    <Grid templateRows="auto 1fr auto" maxW="100%" h="94vh" overflowX="hidden">
      <GridItem>
        {opponentUser && <ChatHeader chatPartner={opponentUser} />}
      </GridItem>
      <GridItem maxW="100vw" overflowY="auto" sx={scrollBarStyle}>
        <ChatMessages
          messages={messages}
          getSenderAvatar={getSenderAvatar}
          isCurrentUser={isCurrentUser}
          chatEndRef={chatEndRef}
        />
        {/* <VideoCallComponent /> */}
      </GridItem>
      <GridItem>
        <ChatInputField
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSubmit={handleSubmit}
        />
      </GridItem>
    </Grid>
  );
};

export default ChatRoom;
