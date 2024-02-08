// useAuth.ts
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { User } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    // Subscribe to the user's sign-in state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user };
};

export default useAuth;
