import logoWithText from "../assets/logowithtext.svg";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Heading,
  Center,
  Card,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link as ChakraLink,
} from "@chakra-ui/react";

interface PasswordResetProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleResetPassword: () => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

const PasswordReset = ({
  email,
  setEmail,
  handleResetPassword,
  isOpen,
  onClose,
  navigate,
}: PasswordResetProps) => {
  return (
    <>
      <Card
        bg="white"
        p={6}
        rounded="lg"
        boxShadow="lg"
        w="100%"
        maxW="xl"
        padding={50}
        margin={10}
      >
        <VStack spacing={4} align="flex-start">
          <Center w="100%">
            <Image src={logoWithText} boxSize="20" />
          </Center>
          <Heading size="lg" textAlign="center" w="full">
            Reset Password
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          <Button
            colorScheme="teal"
            w="full"
            mt={3}
            onClick={handleResetPassword}
          >
            Reset password
          </Button>
          <VStack spacing={1} align="stretch" w="100%">
            <Text mt={6} fontSize="sm" align="center">
              Don't have an account?
            </Text>

            <ChakraLink
              as={ReactRouterLink}
              color="teal"
              textAlign="center"
              fontWeight="bold"
              to="/register"
            >
              Sign Up
            </ChakraLink>
          </VStack>
        </VStack>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Check Your Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            If an account with the email address exists, you will receive an
            email with instructions on how to reset your password.
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                handleResetPassword();
              }}
            >
              Resend
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                navigate("/");
              }}
            >
              Success
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordReset;
