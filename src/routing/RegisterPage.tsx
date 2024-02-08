import { Center } from "@chakra-ui/react";
import SignUp from "../components/SignUp";
import useSignUp from "../hooks/useSignUp";

const RegisterPage = () => {
  const {
    userDetails,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    tabIndex,
    setTabIndex,
    show,
    view,
    handleClick,
    handleClick2,
    handleInputChange,
    signUp,
  } = useSignUp();
  return (
    <Center minH="100vh" bg="gray.50">
      <SignUp
        userDetails={userDetails}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        show={show}
        view={view}
        handleClick={handleClick}
        handleClick2={handleClick2}
        handleInputChange={handleInputChange}
        signUp={signUp}
      />
    </Center>
  );
};

export default RegisterPage;
