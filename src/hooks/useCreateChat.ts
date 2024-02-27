import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const useCreateChat = () => {
  const createChat = async (userId1: string, userId2: string) => {
    const chatsRef = collection(db, 'chats');
    const docRef = await addDoc(chatsRef, {
      participants: [userId1, userId2],
    });

    return docRef.id;
  };

  return createChat;
};

export default useCreateChat;
