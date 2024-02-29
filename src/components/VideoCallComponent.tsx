import { Container, Button, AspectRatio } from "@chakra-ui/react";
import useVideoCall from "../hooks/useVideoCall";
import { useEffect } from "react";

const VideoCallComponent = () => {
  const {
    status,
    createOffer,
    createAnswer,
    localVideoRef,
    remoteVideoRef,
    onHangup,
  } = useVideoCall();

  useEffect(() => {
    if (status === "Answer the Call") {
      createAnswer();
    }
  }, [status, createAnswer]);

  return (
    <Container>
      <Container>
        {`Current State: ${status}`}
        {status === "Start" && (
          <Button m={3} onClick={createOffer}>
            Call
          </Button>
        )}
        {status === "Answer the Call" && (
          <Button m={3} onClick={createAnswer}>
            Answer
          </Button>
        )}
        {status === "Calling" && (
          <Button colorScheme="red" m={3} onClick={onHangup}>
            Hangup
          </Button>
        )}
      </Container>

      <AspectRatio maxW="560px" ratio={1} m={5}>
        <video ref={localVideoRef} autoPlay playsInline />
      </AspectRatio>
      <AspectRatio maxW="560px" ratio={1}>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </AspectRatio>
    </Container>
  );
};

export default VideoCallComponent;
