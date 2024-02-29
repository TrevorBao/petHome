import { useCallback, useEffect, useRef, useState } from "react";
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
  const isCreatingAnswerRef = useRef(false);

  const firestoreSend = useCallback(async (type: string, data: any) => {
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
  }, [callDocRef, userId]);

  const createAnswer = useCallback(() => {
    if (isCreatingAnswerRef.current) return;
  
    isCreatingAnswerRef.current = true;
  
    pc.current
      ?.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      })
      .then((sdp) => {
        return pc.current?.setLocalDescription(sdp);
      })
      .then(() => {
        const answer = pc.current?.localDescription;
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
        isCreatingAnswerRef.current = false;
      });
  }, [firestoreSend]);


  const hangup = useCallback(async () => {
    if (!isMountedRef.current) return;

    if (callDocRef) {
      await setDoc(callDocRef, { callEnded: true }, { merge: true });
    }
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
    navigate(-1);
  }, [callDocRef, navigate])

  useEffect(() => {
    const getMediaDevices = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current!.srcObject = stream;
      localStreamRef.current = stream;
    };
    
    const setupFirestoreListeners = () => {
      if (!callDocRef) return;
  
      console.log("Setting up Firestore listener for callDocRef:", callDocRef);
    
      onSnapshot(callDocRef, (docSnapshot) => {
        console.log("Firestore listener triggered at:", new Date().toISOString());
        const callData = docSnapshot.data();
        console.log("Received call data:", callData);
        if (!callData) return;
        if (callData.callEnded) {
          hangup();
          return;
        }
        // Handle offer
        if (callData.offer && callData.offer.userId !== userId) {
          if (callData.offer.timestamp > lastProcessedOfferTimestamp.current) {
            lastProcessedOfferTimestamp.current = callData.offer.timestamp;
              if (callData.offer.sdp) {
                try {
                  pc.current?.setRemoteDescription(new RTCSessionDescription({
                    type: 'offer',
                    sdp: callData.offer.sdp
                  }))
                  .then(createAnswer);
                  console.log("Send Offer");
                  setStatus("Answer the Call");
                } catch (error) {
                  console.error("Error setting remote offer", error);
                  
                }
              }
        }}
  
        if (callData.answer && callData.answer.userId !== userId) {
        if (callData.answer.timestamp > lastProcessedAnswerTimestamp.current) {
          lastProcessedAnswerTimestamp.current = callData.answer.timestamp;
              if (callData.answer.sdp) {
                pc.current?.setRemoteDescription(new RTCSessionDescription({
                  type: 'answer',
                  sdp: callData.answer.sdp
                }))
              }
              console.log("Send Answer");
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
      });
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
    
    const handleUnload = async (event) => {
      await hangup();
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [hangup, callDocRef, createAnswer, userId, firestoreSend]);



  
  

  let isCreatingOffer = false;
  
  const createOffer = () => {
    if (isCreatingOffer || isCreatingAnswerRef.current) return;
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
          return firestoreSend("offer", { type: offer.type, sdp: offer.sdp });
        }
      })
      .then(() => {
        setStatus("Waiting for Answering");
      })
      .catch((error) => {
        console.error("Error creating offer", error);
      })
      .finally(() => {
        isCreatingOffer = false;
      });
  };

  
  

  return {status, createOffer, createAnswer, localVideoRef, remoteVideoRef, hangup}
};

export default useVideoCall;