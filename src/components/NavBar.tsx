import NavBarSignIn from "./NavBarSignIn";
import NavBarNotRegistered from "./NavBarNotRegistered";
import useAuth from "../routing/hooks/useAuth";

const NavBar = () => {
  const { user, loading } = useAuth();

  if (loading) return;

  return <>{user ? <NavBarSignIn /> : <NavBarNotRegistered />}</>;
};

export default NavBar;
