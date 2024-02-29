import { AspectRatio, Button, Container } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useUsers from "../hooks/useUsers";

const Call = () => {
  const { currentUser } = useUsers();
  const userId = currentUser?.userId;

  // Video Call features
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pc = useRef<RTCPeerConnection>();
  const localStreamRef = useRef<MediaStream>();
  const wsRef = useRef(new WebSocket("ws://127.0.0.1:1234"));
  const [status, setStatus] = useState("Start Calling");

  useEffect(() => {
    initWs();
    getMediaDevices().then(() => {
      createRtcConnection();
      addLocalStreamtoRTCConnection();
    });
  }, [userId]);

  const initWs = () => {
    wsRef.current.onopen = () => console.log("ws 已经打开");
    wsRef.current.onmessage = wsOnMessage;
  };

  const getMediaDevices = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    console.log("stream", stream);
    localVideoRef.current!.srcObject = stream;
    localStreamRef.current = stream;
  };

  const createRtcConnection = () => {
    const _pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ["stun:stun.stunprotocol.org:3478"],
        },
      ],
    });
    _pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("candidate", JSON.stringify(e.candidate));
        wsSend("candidate", JSON.stringify(e.candidate));
      }
    };
    _pc.ontrack = (e) => {
      remoteVideoRef.current!.srcObject = e.streams[0];
    };
    pc.current = _pc;
    console.log("rtc 连接创建成功", _pc);
  };

  const addLocalStreamtoRTCConnection = () => {
    const localStream = localStreamRef.current!;
    localStream.getTracks().forEach((track) => {
      pc.current!.addTrack(track, localStream);
    });
    console.log("将本地视频流添加到 RTC 连接成功");
  };

  const wsOnMessage = (e: MessageEvent) => {
    if (!userId) {
      return;
    }

    const wsData = JSON.parse(e.data);
    console.log("wsData", wsData);

    const wsUserId = wsData["userId"];
    console.log("wsUserId", wsUserId);
    console.log(userId);
    if (userId === wsUserId) {
      console.log("跳过处理本条信息");
      return;
    }

    const wsType = wsData["type"];
    console.log("wsType", wsType);

    if (wsType === "offer") {
      const wsOffer = wsData["data"];
      pc.current?.setRemoteDescription(
        new RTCSessionDescription(JSON.parse(wsOffer))
      );
      setStatus("Answer the Call");
    }

    if (wsType === "answer") {
      const wsAnswer = wsData["data"];
      pc.current?.setRemoteDescription(
        new RTCSessionDescription(JSON.parse(wsAnswer))
      );
      setStatus("Calling");
    }

    if (wsType === "candidate") {
      const wsCandidate = JSON.parse(wsData["data"]);
      pc.current?.addIceCandidate(new RTCIceCandidate(wsCandidate));
      console.log("添加候选成功", wsCandidate);
    }
  };

  const wsSend = (type: string, data: any) => {
    wsRef.current.send(
      JSON.stringify({
        userId,
        type,
        data,
      })
    );
  };

  const createOffer = () => {
    pc.current
      ?.createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        console.log("offer", JSON.stringify(sdp));
        pc.current?.setLocalDescription(sdp);
        wsSend("offer", JSON.stringify(sdp));
        setStatus("Waiting for Answering");
      });
  };

  const createAnswer = () => {
    pc.current
      ?.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        console.log("answer", JSON.stringify(sdp));
        pc.current?.setLocalDescription(sdp);
        wsSend("answer", JSON.stringify(sdp));
        setStatus("Calling");
      });
  };

  return (
    <Container>
      <Container>
        {`Current State: ${status}`}
        {status === "Start Calling" && (
          <Button m={3} onClick={createOffer}>
            Call
          </Button>
        )}
        {status === "Answer the Call" && (
          <Button m={3} onClick={createAnswer}>
            Answer
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

export default Call;
