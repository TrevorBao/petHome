import { Avatar, Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
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

  // Use Chakra UI's useBreakpointValue to set responsive sizes
  const avatarSize = useBreakpointValue({ base: "md", md: "lg" });
  const paddingX = useBreakpointValue({ base: "2", md: "4" });
  const minWidth = useBreakpointValue({
    base: "100%",
    md: "350px",
    xl: "400px",
  });

  return (
    <>
      {chatPartners.map((partner, index) => (
        <Box
          key={partner.user.userId || index}
          p={2}
          px={paddingX}
          minWidth={minWidth}
          _hover={{ bg: "gray.300" }}
          borderBottom="1px solid"
          borderColor="gray.300"
          bg={isActiveChat(partner.chatId) ? "gray.300" : "transparent"}
          onClick={() => {
            navigate(`/chat/${currentUser?.userId}/${partner.chatId}`);
            setActiveChatId(partner.chatId);
          }}
        >
          <Flex align="center" gap="2">
            <Avatar
              src={partner.user.avatarUrl}
              size={avatarSize}
              name={partner.user.userName}
            />
            <Box flex="1">
              <Text fontSize="md" fontWeight="bold" noOfLines={1}>
                {partner.user.userName}
              </Text>
              <Text fontSize="sm" color="gray.800" noOfLines={1}>
                {partner.latestMessage?.text || "No messages yet"}
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default ChatUserList;
