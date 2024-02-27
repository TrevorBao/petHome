import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import useUsers, { UserProps } from './useUsers';
import { IMessage } from './useChat';

export interface IChatPartner {
  user: UserProps; 
  latestMessage: IMessage | null;
  chatId: string;
}

const useChatPartners = () => {
  const [chatPartners, setChatPartners] = useState<IChatPartner[]>([]);
  const { currentUser, users } = useUsers();

  useEffect(() => {
    if (!currentUser?.userId) return;

    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', currentUser.userId));

    const unsubscribeChats = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach(async (change) => {
        if (change.type === "added" || change.type === "modified") {
            const chatId = change.doc.id;
          const data = change.doc.data();
          const participants: string[] = data.participants;
          const partnerId = participants.find(id => id !== currentUser.userId);
          if (partnerId) {
            const user = users.find(user => user.userId === partnerId);
            if (user) {
              const messagesRef = collection(db, 'chats', chatId, 'messages');
              const messagesQuery = query(messagesRef, orderBy('time', 'desc'), limit(1));

              onSnapshot(messagesQuery, (messagesSnapshot) => {
                const latestMessageDoc = messagesSnapshot.docs[0];
                const latestMessage = latestMessageDoc ? {
                  ...latestMessageDoc.data(),
                  id: latestMessageDoc.id,
                } as IMessage : null;
                setChatPartners(prevPartners => {
                  const existingPartnerIndex = prevPartners.findIndex(partner => partner.user.userId === partnerId);
                  if (existingPartnerIndex !== -1) {
                    const updatedPartners = [...prevPartners];
                    updatedPartners[existingPartnerIndex] = { ...updatedPartners[existingPartnerIndex], latestMessage };
                    return updatedPartners;
                  } else {
                    return [...prevPartners, { user, latestMessage, chatId  }];
                  }
                });
              });

            }
          }
        }
      });
    });

    return () => {
      unsubscribeChats(); 
    };
  }, [currentUser, users]);

  return chatPartners;
};

export default useChatPartners;
