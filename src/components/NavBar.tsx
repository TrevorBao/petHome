import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { User } from "firebase/auth";
import NavBarSignIn from "./NavBarSignIn";
import NavBarNotRegistered from "./NavBarNotRegistered";

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <>{user ? <NavBarSignIn /> : <NavBarNotRegistered />}</>;
};

export default NavBar;
