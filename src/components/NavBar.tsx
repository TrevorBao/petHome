import NavBarSignIn from "./NavBarSignIn";
import NavBarNotRegistered from "./NavBarNotRegistered";
import useAuth from "../routing/hooks/useAuth";

const NavBar = () => {
  const { user } = useAuth();

  return <>{user ? <NavBarSignIn /> : <NavBarNotRegistered />}</>;
};

export default NavBar;
