import { Center } from "@chakra-ui/react";
import SignIn from "../components/SignIn";
import useSignIn from "../hooks/useSignIn";

const LogInPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setRememberMe,
    show,
    handleClick,
    signIn,
    signInWithGoogle,
    handleNavigation,
  } = useSignIn();
  return (
    <Center minH="100vh" bg="gray.50">
      <SignIn
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setRememberMe={setRememberMe}
        show={show}
        handleClick={handleClick}
        signIn={signIn}
        signInWithGoogle={signInWithGoogle}
        handleNavigation={handleNavigation}
      />
    </Center>
  );
};

export default LogInPage;
