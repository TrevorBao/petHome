import {
  Box,
  Button,
  HStack,
  Text,
  Input,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import useUsers, { UserProps } from "../hooks/useUsers";

interface IMessage {
  id: string;
  text: string;
  senderId: string;
  time: Timestamp;
}

const ChatInputField = () => {
  const { id: chatId } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { currentUser, users } = useUsers();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [opponentUser, setOpponentUser] = useState<UserProps>();

  const messagesRef = chatId
    ? collection(db, "chats", chatId, "messages")
    : null;
  useEffect(() => {
    const fetchParticipants = async () => {
      if (chatId) {
        const chatRef = doc(db, "chats", chatId);
        const chatDoc = await getDoc(chatRef);
        if (chatDoc.exists()) {
          const participants = chatDoc.data().participants || [];
          const opponentId = participants.find(
            (p) => p !== currentUser?.userId
          );
          const opponentUser = users.find((user) => user.userId === opponentId);
          setOpponentUser(opponentUser);
        }
      }
    };
    fetchParticipants();
  });

  useEffect(() => {
    if (chatId && messagesRef) {
      const queryMessages = query(messagesRef, orderBy("time"));
      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        const newMessages: IMessage[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as IMessage;
          newMessages.push({ ...data, id: doc.id });
        });
        setMessages(newMessages);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !messagesRef) return;

    console.log(chatId);
    console.log(currentUser?.userId);
    try {
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser?.userId,
        time: serverTimestamp(),
      });
      console.log(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", (error as Error).message);
    }
  };

  const getSenderName = (senderId: string) => {
    const user = users.find((user) => user.userId === senderId);
    return user ? user.userName : "Unknown User";
  };

  const isCurrentUser = (senderId: string) => {
    return currentUser?.userId === senderId;
  };

  const scrollBarStyle = {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  return (
    <VStack width="100%" height="90vh">
      <HStack
        zIndex="sticky"
        width="full"
        px={8}
        justifyContent="center"
        backgroundColor="gray.100"
      >
        <Center>
          <Heading>{opponentUser?.userName}</Heading>
        </Center>
      </HStack>
      <Box
        flex="1"
        overflowY="auto"
        px={8}
        pt={6}
        sx={scrollBarStyle}
        width="full"
      >
        <VStack align="stretch" spacing="4">
          {messages.map((message) => (
            <Box
              key={message.id}
              alignSelf={
                isCurrentUser(message.senderId) ? "flex-end" : "flex-start"
              }
              padding="2"
              borderRadius="lg"
              background={
                isCurrentUser(message.senderId) ? "blue.500" : "gray.200"
              }
              color={isCurrentUser(message.senderId) ? "white" : "black"}
            >
              <Text fontWeight="bold">{getSenderName(message.senderId)}</Text>
              <Text>{message.text}</Text>
            </Box>
          ))}
          <div ref={chatEndRef} />
        </VStack>
      </Box>
      <HStack
        as="form"
        onSubmit={handleSubmit}
        mt={4}
        zIndex="sticky"
        width="full"
        px={8}
        pb={8}
      >
        <Input
          flexGrow="1"
          variant="filled"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </HStack>
    </VStack>
  );
};

export default ChatInputField;
