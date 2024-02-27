import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Center, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { useChatContext } from "../hooks/useChatContext";
import { IoVideocamOutline } from "react-icons/io5";

interface Props {
  chatPartnerName: string;
}

const ChatHeader = ({ chatPartnerName }: Props) => {
  const navigate = useNavigate();
  const { currentUser } = useUsers();
  const { setActiveChatId } = useChatContext();
  return (
    <Flex
      width="full"
      px={5}
      py={3.5}
      alignItems="center"
      justifyContent="space-between"
      bg="gray.50"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <IconButton
        aria-label="Back to user list"
        icon={<ChevronLeftIcon />}
        variant="ghost"
        onClick={() => {
          navigate(`/chat/${currentUser?.userId}`);
          setActiveChatId(null);
        }}
      />
      <Center>
        <Heading size="md">{chatPartnerName}</Heading>
      </Center>
      <IconButton
        aria-label="Video Call"
        icon={<IoVideocamOutline />}
        variant="ghost"
      />
    </Flex>
  );
};

export default ChatHeader;
