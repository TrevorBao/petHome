import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import useUsers, { UserProps } from '../hooks/useUsers';

export interface IMessage {
    id: string;
    text: string;
    senderId: string;
    time: Timestamp;
}

const useChat = () => {
  const { chatId } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { currentUser, users } = useUsers();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [opponentUser, setOpponentUser] = useState<UserProps>();

  const messagesRef = chatId ? collection(db, 'chats', chatId, 'messages') : null;

  useEffect(() => {
    const fetchParticipants = async () => {
      if (chatId) {
        const chatRef = doc(db, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);
        if (chatDoc.exists()) {
          const participants = chatDoc.data().participants || [];
          const opponentId = participants.find((p) => p !== currentUser?.userId);
          const opponentUserData = users.find((user) => user.userId === opponentId);
          setOpponentUser(opponentUserData);
        }
      }
    };

    fetchParticipants();
  }, [chatId, currentUser, users]);

  useEffect(() => {
    if (messagesRef) {
      const q = query(messagesRef, orderBy('time'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages: IMessage[] = [];
        snapshot.forEach((doc) => {
            const data = doc.data() as IMessage;
            newMessages.push({ ...data, id: doc.id });
          });
        setMessages(newMessages);
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
      const timer = setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return () => clearTimeout(timer);
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !messagesRef) return;

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser?.userId,
        time: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const getSenderAvatar = (senderId: string) => {
    const user = users.find((u) => u.userId === senderId);
    return user ? user.avatarUrl : 'Unknown User';
  };

  const isCurrentUser = (senderId: string) => {
    return currentUser?.userId === senderId;
  };

  return {
    newMessage,
    setNewMessage,
    messages,
    handleSubmit,
    getSenderAvatar,
    isCurrentUser,
    chatEndRef,
    opponentUser,
  };
};

export default useChat;
