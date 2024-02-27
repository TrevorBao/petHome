import { Avatar, Box, Grid, GridItem, Text } from "@chakra-ui/react";
import useChatPartners from "../hooks/useChatPartners";
import { useLocation, useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { useChatContext } from "../hooks/useChatContext";

const ChatUserList = () => {
  const location = useLocation();
  const { currentUser } = useUsers();
  const chatPartners = useChatPartners();
  const navigate = useNavigate();
  const { setActiveChatId } = useChatContext();

  const isActiveChat = (chatId: string) => {
    return location.pathname.includes(chatId);
  };

  return (
    <>
      {chatPartners.map((partner, index) => (
        <Box
          key={partner.user.userId || index}
          p={2}
          _hover={{ bg: "gray.300" }}
          borderBottom="1px solid"
          borderColor="gray.300"
          bg={isActiveChat(partner.chatId) ? "gray.300" : "transparent"}
          onClick={() => {
            navigate(`/chat/${currentUser?.userId}/${partner.chatId}`);
            setActiveChatId(partner.chatId);
          }}
        >
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={2}
            alignItems="center"
          >
            <GridItem rowSpan={2} colSpan={1}>
              <Avatar
                src={partner.user.avatarUrl}
                size="md"
                name={partner.user.userName}
              />
            </GridItem>
            <GridItem colStart={2} colEnd={6}>
              <Text fontSize="md" fontWeight="bold" noOfLines={1}>
                {partner.user.userName}
              </Text>
            </GridItem>
            <GridItem colStart={2} colEnd={6}>
              <Text fontSize="sm" color="gray.800" noOfLines={1}>
                {partner.latestMessage?.text || "No messages yet"}
              </Text>
            </GridItem>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default ChatUserList;
