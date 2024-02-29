import { ReactNode, createContext, useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

interface Props {
  children: ReactNode;
}

interface CallContextType {
  incomingCall: CallData | null;
  setIncomingCall: (call: CallData | null) => void;
}

// 呼叫数据类型定义
interface CallData {
  chatId: string;
  callId: string;
  callerName: string;
}

export const VideoCallContext = createContext<CallContextType>({
  incomingCall: null,
  setIncomingCall: () => {},
});

export const VideoCallProvider = ({ children }: Props) => {
  const { currentUser } = useUsers();
  const [incomingCall, setIncomingCall] = useState<CallData | null>(null);
  const [hangupSignal, setHangupSignal] = useState(false);
  const [appStartTime] = useState(() => new Date().getTime());
  const timeThreshold = 10000;

  const triggerHangup = () => {
    setHangupSignal(true);
    setTimeout(() => setHangupSignal(false), 100); // Reset signal after a brief moment
  };

  useEffect(() => {
    if (!currentUser?.userId) return;

    const userId = currentUser?.userId;
    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const callsCollection = collection(db, "chats", doc.id, "calls");
        const callsQuery = query(callsCollection, where("offer", "!=", null));

        onSnapshot(callsQuery, (callsSnapshot) => {
          callsSnapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              const call = change.doc.data();
              const callCreatedAt = new Date(call.createdAt.seconds * 1000);
              if (
                call.offer.userId !== userId &&
                Math.abs(callCreatedAt.getTime() - appStartTime) <=
                  timeThreshold
              ) {
                const usersRef = collection(db, "userInfo");
                const q = query(
                  usersRef,
                  where("userId", "==", call.offer.userId)
                );
                const querySnapshot = await getDocs(q);
                const callerUserData = querySnapshot.docs[0]?.data();

                setIncomingCall({
                  chatId: doc.id,
                  callId: change.doc.id,
                  callerName: callerUserData?.userName || "Unkown User",
                });
              }
            }
          });
        });
      });
    });

    return () => unsubscribe();
  }, [currentUser, appStartTime]);

  const value = { incomingCall, setIncomingCall, hangupSignal, triggerHangup };

  return (
    <VideoCallContext.Provider value={value}>
      {children}
    </VideoCallContext.Provider>
  );
};
