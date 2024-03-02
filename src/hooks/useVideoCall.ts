import { useEffect, useRef, useState } from "react";
import { arrayUnion, collection, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";

interface IceCandidate {
  candidate: string;
  userId: string;
}

const useVideoCall = () => {
  const { userId, chatId, callId } = useParams();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pc = useRef<RTCPeerConnection>();
  const localStreamRef = useRef<MediaStream>();
  const [status, setStatus] = useState("Start");
  const navigate = useNavigate();
  const isMountedRef = useRef<boolean>(true);
  const hangupTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const getMediaDevices = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current!.srcObject = stream;
      localStreamRef.current = stream;
    };

    const createRtcConnection = () => {
      const _pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: ["stun:stun.stunprotocol.org:3478",
                   "stun:stun1.l.google.com:19302",
                   "stun:stun2.l.google.com:19302",],
          },
        ],
      });
      _pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log("candidate", JSON.stringify(e.candidate));
          firestoreSend("candidate", JSON.stringify(e.candidate));
        }
      };
      _pc.ontrack = (e) => {
        remoteVideoRef.current!.srcObject = e.streams[0];
      };
      pc.current = _pc;
      console.log("rtc 连接创建成功", _pc);
    };

    setupFirestoreListeners();
    getMediaDevices().then(() => {
      createRtcConnection();
      addLocalStreamtoRTCConnection();
    });


    window.addEventListener('beforeunload', handleUnload);
    return () => {
      if (hangupTimeoutRef.current) {
        clearTimeout(hangupTimeoutRef.current);
      }
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const addLocalStreamtoRTCConnection = () => {
    const localStream = localStreamRef.current!;
    localStream.getTracks().forEach((track) => {
      pc.current!.addTrack(track, localStream);
    });
    console.log("将本地视频流添加到 RTC 连接成功");
  };

  const callsCollectionRef = chatId ? collection(db, 'chats', chatId, 'calls') : null;
  const callDocRef = callsCollectionRef ? doc(callsCollectionRef, callId) : null;
  const lastProcessedOfferTimestamp = useRef(0);
  const lastProcessedAnswerTimestamp = useRef(0);
  
  const setupFirestoreListeners = () => {
    if (!callDocRef) {
      console.log("No call document reference found.");
      return;
    }

    console.log("Setting up Firestore listener for callDocRef:", callDocRef);
  
    const unsubscribe = onSnapshot(callDocRef, async (docSnapshot) => {
      console.log("Firestore listener triggered at:", new Date().toISOString());
      
      if (!docSnapshot.exists()) {
        console.log("Document does not exist");
        return;
      }
      
      const callData = docSnapshot.data();
      console.log("Received call data:", callData);
      if (!callData) return;
      if (callData.callEnded) {
        onHangup();
        return;
      }
      // Handle offer
      if (callData.offer && callData.offer.userId !== userId) {
        if (callData.offer.timestamp > lastProcessedOfferTimestamp.current) {
          lastProcessedOfferTimestamp.current = callData.offer.timestamp;
            if (callData.offer.sdp) {
              setTimeout(async () => {
                try {
                  console.log('开始')
                  console.log('Received offer SDP from database:', callData.offer.sdp);
                  await pc.current?.setRemoteDescription(new RTCSessionDescription({
                    type: 'offer',
                    sdp: callData.offer.sdp
                  }));
                  console.log("Current remote description:", pc.current?.remoteDescription);
                  setStatus("Answer the Call");
                  console.log("结束");
                } catch (error) {
                  console.error("Error setting remote offer", error);
                }
            }, 1000)
            }
      }}

      if (callData.answer && callData.answer.userId !== userId) {
      if (callData.answer.timestamp > lastProcessedAnswerTimestamp.current) {
        lastProcessedAnswerTimestamp.current = callData.answer.timestamp;
            if (callData.answer.sdp) {
              await pc.current?.setRemoteDescription(new RTCSessionDescription({
                type: 'answer',
                sdp: callData.answer.sdp
              }))
            }
            console.log("Send Answer");
            clearTimeout(hangupTimeoutRef.current!);
            setStatus("Calling");
        }}
      
      // Handle ICE candidates
      if (callData.candidates) {
        callData.candidates.forEach((candidate: IceCandidate) => {
          if (candidate.userId !== userId) {
            const iceCandidate = JSON.parse(candidate.candidate);
            pc.current?.addIceCandidate(new RTCIceCandidate(iceCandidate));
          }
        });
      }


    }, (error) => {
      console.error("Error listening to the call document:", error);
    });

    return unsubscribe;
  };

  const firestoreSend = async (type: string, data: any) => {
    if (!callDocRef) return;
  
    if (type === 'offer' || type === 'answer') {
      await setDoc(callDocRef, {
        [type]: {
          sdp: data.sdp,
          type: data.type,
          userId,
          timestamp: serverTimestamp(),
        },
      }, { merge: true });
    } else if (type === 'candidate') {
      await setDoc(callDocRef, {
        candidates: arrayUnion({ candidate: data, userId }),
      }, { merge: true });
    }
  };
  
  

  let isCreatingOffer = false;
  let isCreatingAnswer = false;
  
  const createOffer = () => {
    if (isCreatingOffer || isCreatingAnswer) return;
    isCreatingOffer = true;
  
    pc.current
      ?.createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        return pc.current?.setLocalDescription(sdp);
      })
      .then(() => {
        const offer = pc.current?.localDescription;
        if (offer) {
          console.log("Sending offer:", offer);
          firestoreSend("offer", { type: offer.type, sdp: offer.sdp });
          setStatus("Waiting for Answering");

          hangupTimeoutRef.current = window.setTimeout(() => {
            console.log("No answer within 60 seconds, hanging up.");
            hangup();
          }, 61000);
          

        }
      })
      .catch((error) => {
        console.error("Error creating offer", error);
      })
      .finally(() => {
        isCreatingOffer = false;
      });
  };
  
  const createAnswer = () => {
    if (isCreatingOffer || isCreatingAnswer) return;
    isCreatingAnswer = true;
    
    console.log("阿秋")
    console.log("Current RTCPeerConnection state:", pc.current);
    console.log(pc.current?.signalingState)

    // Assuming that the offer has been set as the remote description successfully
    
    if (pc.current?.signalingState === "have-remote-offer") {
      console.log("哒哒");
      pc.current.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        console.log("你好啊");
        return pc.current?.setLocalDescription(sdp);
      })
      .then(() => {
        console.log("好得很");
        const answer = pc.current?.localDescription;
        console.log("非常好");
        if (answer) {
          console.log("Sending answer:", answer);
          return firestoreSend("answer", { type: answer.type, sdp: answer.sdp });
        }
      })
      .then(() => {
        setStatus("Calling");
      })
      .catch((error) => {
        console.error("Error creating answer", error);
      })
      .finally(() => {
        isCreatingAnswer = false;
      });
    } else {
      console.error("Signaling state is not 'have-remote-offer', cannot create answer.");
      isCreatingAnswer = false;
    }
    
  };
  

   const handleUnload = async (event) => {
    clearTimeout(hangupTimeoutRef.current!);
     await onHangup();
   };
  

  const hangup = async () => {
    if (!isMountedRef.current) return;

    if (callDocRef) {
      await setDoc(callDocRef, { callEnded: true }, { merge: true });
    }

    console.log("done");
    // Close the RTCPeerConnection
    if (pc.current) {
      pc.current.getSenders().forEach((sender) => {
        pc.current!.removeTrack(sender); 
      });
      pc.current.close();
      pc.current = undefined;
    }
    

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setStatus('Start');
  }


  const onHangup = () => {
    hangup();
    navigate(-1);
  }
  
  

  return {status, createOffer, createAnswer, localVideoRef, remoteVideoRef, hangup, onHangup, localStreamRef}
};

export default useVideoCall;