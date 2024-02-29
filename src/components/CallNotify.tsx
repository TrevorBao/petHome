import { useContext, useEffect } from "react";
import { VideoCallContext } from "../contexts/VideoCallContex";
import {
  Box,
  VStack,
  useToast,
  Text,
  Heading,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";

const CallNotify = () => {
  const { incomingCall, setIncomingCall } = useContext(VideoCallContext);
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser } = useUsers();

  const onAnswer = () => {
    navigate(
      `/chat/${currentUser?.userId}/${incomingCall?.chatId}/call/${incomingCall?.callId}`
    );
    toast.closeAll();
  };

  useEffect(() => {
    if (incomingCall) {
      toast({
        duration: 90000,
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
                />
              </HStack>
            </VStack>
          </Box>
        ),
      });
      setIncomingCall(null);
    }
  }, [incomingCall, toast, setIncomingCall]);

  return null;
};

export default CallNotify;
