import { Button, Box, Center, IconButton } from "@chakra-ui/react";
import useVideoCall from "../hooks/useVideoCall";
import { useEffect, useState } from "react";
import { ImPhoneHangUp } from "react-icons/im";
import { BsCameraVideoOffFill, BsFillCameraVideoFill } from "react-icons/bs";
import { FaMicrophoneSlash, FaMicrophone } from "react-icons/fa";

const VideoCallComponent = () => {
  const {
    status,
    createOffer,
    createAnswer,
    localVideoRef,
    remoteVideoRef,
    onHangup,
    localStreamRef,
  } = useVideoCall();

  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const toggleAudio = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        console.log("Local video track before toggling:", track);
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(
        videoTracks.length > 0 ? videoTracks[0].enabled : false
      );
    }
  };

  useEffect(() => {
    if (status === "Answer the Call") {
      createAnswer();
    }
  }, [status, createAnswer]);

  if (status === "Start") {
    return (
      <Box position="relative" height="94vh" overflowY="hidden">
        <video
          ref={localVideoRef}
          style={{ display: "none" }}
          autoPlay
          playsInline
        />
        <Box position="absolute" bottom="4" right="4" width="150px" zIndex="5">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "auto", display: "none" }}
          />
        </Box>
        <Center position="absolute" top="0" right="0" bottom="0" left="0">
          <Button colorScheme="green" onClick={createOffer}>
            Call
          </Button>
        </Center>
      </Box>
    );
  }

  if (status === "Answer the Call") {
    return (
      <Box position="relative" height="100%">
        <video
          ref={localVideoRef}
          style={{ display: "none" }}
          autoPlay
          playsInline
        />
        <Box position="absolute" bottom="4" right="4" width="150px" zIndex="5">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "auto", display: "none" }}
          />
        </Box>
        <Center position="absolute" top="0" right="0" bottom="0" left="0">
          <Button colorScheme="green" onClick={createAnswer}>
            Answer
          </Button>
        </Center>
      </Box>
    );
  }

  if (status === "Waiting for Answering") {
    return (
      <Box position="relative" height="100%">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%" }}
        />
        <Box position="absolute" bottom="4" right="4" width="150px" zIndex="5">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "auto", display: "none" }}
          />
        </Box>
        <Button
          colorScheme="red"
          position="absolute"
          bottom="4"
          right="4"
          onClick={onHangup}
        >
          Cancel
        </Button>
      </Box>
    );
  }

  if (status === "Calling") {
    return (
      <Box position="relative" height="94vh" overflowY="hidden">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{
            zIndex: "2",
            transform: "scaleX(-1)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
        <Box
          position="absolute"
          top="20"
          right="4"
          width="220px"
          height="auto"
          overflow="hidden"
          zIndex="4"
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            style={{
              transform: "scaleX(-1)",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Box
          position="absolute"
          left="50%"
          bottom="4"
          zIndex="6"
          transform="translateX(-50%)"
          backgroundColor="whiteAlpha.700"
          borderRadius="50px"
          p={2}
        >
          <IconButton
            aria-label={isAudioMuted ? "unmuted" : "mute"}
            variant={isAudioMuted ? "solid" : "outline"}
            icon={isAudioMuted ? <FaMicrophone /> : <FaMicrophoneSlash />}
            onClick={toggleAudio}
            m={2}
            mr={10}
            isRound
          />
          <IconButton
            aria-label="Hangup"
            isRound
            icon={<ImPhoneHangUp />}
            colorScheme="red"
            onClick={onHangup}
          />

          <IconButton
            aria-label={isVideoEnabled ? "Turn Off Camera" : "Turn On Camera"}
            icon={
              isVideoEnabled ? (
                <BsFillCameraVideoFill />
              ) : (
                <BsCameraVideoOffFill />
              )
            }
            variant={isVideoEnabled ? "solid" : "outline"}
            onClick={toggleVideo}
            m={2}
            ml={10}
            isRound
          />
        </Box>
      </Box>
    );
  }
};
export default VideoCallComponent;
