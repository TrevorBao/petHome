import { useContext, useEffect } from "react";
import { VideoCallContext } from "../contexts/VideoCallContext";
import {
  Box,
  VStack,
  useToast,
  Text,
  Heading,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { collection, doc, setDoc } from "firebase/firestore";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { db } from "../firebase";

const CallNotify = () => {
  const { incomingCall, setIncomingCall } = useContext(VideoCallContext);
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser } = useUsers();

  useEffect(() => {
    const onAnswer = () => {
      navigate(
        `/chat/${currentUser?.userId}/${incomingCall?.chatId}/call/${incomingCall?.callId}`
      );
      toast.closeAll();
    };

    const onDecline = async () => {
      const callsCollectionRef = incomingCall?.chatId
        ? collection(db, "chats", incomingCall.chatId, "calls")
        : null;
      const callDocRef = callsCollectionRef
        ? doc(callsCollectionRef, incomingCall?.callId)
        : null;
      if (callDocRef) {
        await setDoc(callDocRef, { callEnded: true }, { merge: true });
      }
      toast.closeAll();
    };

    if (incomingCall) {
      toast({
        duration: 60000,
        position: "top-right",
        render: () => (
          <Box p={3} bg="gray.200" color="gray.800" borderRadius="xl">
            <VStack spacing={3}>
              <Heading size="md">You have a calling</Heading>
              <Text fontSize="md">
                {incomingCall.callerName} is calling You
              </Text>
              <HStack spacing={10}>
                <IconButton
                  aria-label="Answer the video call"
                  icon={<CheckIcon />}
                  colorScheme="green"
                  size="sm"
                  onClick={onAnswer}
                />
                <IconButton
                  aria-label="Decline the video call"
                  icon={<CloseIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={onDecline}
                />
              </HStack>
            </VStack>
          </Box>
        ),
      });
      setIncomingCall(null);
    }
  }, [incomingCall, toast, setIncomingCall, currentUser?.userId, navigate]);

  return null;
};

export default CallNotify;
