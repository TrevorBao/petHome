import { Grid, GridItem, Text } from "@chakra-ui/react";
import ChatRoom from "../components/ChatRoom";

const ChatPage = () => {
  return (
    <Grid templateColumns="auto 1fr" maxW="100vw" overflowX="hidden">
      <GridItem bg="teal.500" borderRight="1px solid">
        <Text>ChatUserList</Text>
      </GridItem>
      <GridItem maxW="100vw">
        <ChatRoom />
      </GridItem>
    </Grid>
  );
};

export default ChatPage;
