import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

export interface UserProps {
  address: string;
  avatarUrl: string;
  birthday: string;
  email: string;
  firstName: string;
  gender: string;
  job?: string;
  lastName: string;
  petRefs: string[];
  postCode: string;
  userId: string;
  userName: string;
}

interface UseUsersResponse {
  users: UserProps[];
  error: string;
  isLoading: boolean;
  currentUser?: UserProps;
  ownerUser?: UserProps;
}

const useUsers = (): UseUsersResponse => {
  const { id } = useParams();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userCollectionRef = collection(db, "userInfo");
    const unsubscribe = onSnapshot(
      userCollectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const usersData: UserProps[] = snapshot.docs.map((doc) => ({
          ...(doc.data() as UserProps),
          id: doc.id, 
        }));
        setUsers(usersData);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const currentUser = users.find((user) => user.userId === auth?.currentUser?.uid);
  const ownerUser = users.find((user) => user.userId === id);

  return { users, error, isLoading, currentUser, ownerUser };
}

export default useUsers;
