import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import ChatUserList from "../components/ChatUserList";
import { Outlet } from "react-router-dom";
import ChatPlaceholder from "../components/ChatPlaceholder";
import { useChatContext } from "../hooks/useChatContext";

const ChatPage = () => {
  const isLargerThanBase = useBreakpointValue({ base: false, md: true });
  const { activeChatId } = useChatContext();

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "auto 1fr" }}
      maxW="100vw"
      overflowX="hidden"
    >
      <GridItem
        bg="gray.100"
        h="94vh"
        borderRight="1px solid"
        borderColor="gray.300"
      >
        <ChatUserList />
      </GridItem>
      <GridItem maxW="100vw">
        <Outlet />
        {isLargerThanBase && activeChatId == null && <ChatPlaceholder />}
      </GridItem>
    </Grid>
  );
};

export default ChatPage;
