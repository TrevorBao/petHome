import { Center } from "@chakra-ui/react";
import PasswordReset from "../components/PasswordReset";
import usePasswordReset from "../hooks/usePasswordReset";

const ResetPasswordPage = () => {
  const { email, setEmail, handleResetPassword, isOpen, onClose, navigate } =
    usePasswordReset();
  return (
    <Center minH="100vh" bg="gray.50">
      <PasswordReset
        email={email}
        setEmail={setEmail}
        handleResetPassword={handleResetPassword}
        isOpen={isOpen}
        onClose={onClose}
        navigate={navigate}
      />
    </Center>
  );
};

export default ResetPasswordPage;
