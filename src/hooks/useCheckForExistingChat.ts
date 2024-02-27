import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProps } from './useUsers';

interface Props {
    currentUser: UserProps|undefined;
    otherUserId: string;
}

const useCheckForExistingChat = ({currentUser, otherUserId}: Props ) => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !otherUserId) {
      setIsLoading(false);
      return;
    }

    const checkForChat = async () => {
      try {
        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, where('participants', 'array-contains', currentUser.userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data();
          if (data.participants.includes(otherUserId)) {
            setChatId(docSnapshot.id);
            return;
          }
        });
      } catch (error) {
        console.error("Failed to check for existing chat:", error);
      }
      setIsLoading(false);
    };

    checkForChat();
  }, [currentUser, otherUserId]);

  return { chatId, isLoading };
};

export default useCheckForExistingChat;
