import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Center, Container, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useUsers, { UserProps } from "../hooks/useUsers";
import { useChatContext } from "../hooks/useChatContext";
import { IoVideocamOutline } from "react-icons/io5";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

interface Props {
  chatPartner: UserProps;
}

const ChatHeader = ({ chatPartner }: Props) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUsers();
  const { setActiveChatId } = useChatContext();

  const startVideoCall = async () => {
    if (currentUser && chatPartner) {
      try {
        const callsCollectionRef = chatId
          ? collection(db, "chats", chatId, "calls")
          : null;
        const callDocRef = callsCollectionRef
          ? await addDoc(callsCollectionRef, {
              startedBy: currentUser.userId,
              participants: [currentUser.userId, chatPartner.userId],
              createdAt: serverTimestamp(),
            })
          : null;

        if (callDocRef) {
          navigate(
            `/chat/${currentUser.userId}/${chatId}/call/${callDocRef.id}`
          );
        }
      } catch (error) {
        console.error("Error starting video call: ", error);
      }
    }
  };

  return (
    <Container>
      <Flex
        width="100%"
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
          <Heading size="md">{chatPartner.userName}</Heading>
        </Center>
        <IconButton
          aria-label="Video Call"
          icon={<IoVideocamOutline />}
          variant="ghost"
          onClick={startVideoCall}
        />
      </Flex>
    </Container>
  );
};

export default ChatHeader;
