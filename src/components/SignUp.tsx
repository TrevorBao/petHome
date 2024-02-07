import { useState } from "react";
import { auth } from "../firebase";
import logoWithText from "../assets/logowithtext.svg";
import {
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  sendEmailVerification,
} from "firebase/auth";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Heading,
  useToast,
  Center,
  Card,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FirebaseError } from "firebase/app";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();

  const handleAuthError = (error: unknown) => {
    let message;
    if (error instanceof FirebaseError) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    toast({
      title: "Authentication Error",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAuthSuccess = () => {
    navigate("/");
  };

  const signUp = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      toast({
        title: "Verify Email",
        description:
          "A verification email has been sent to your email address.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleAuthSuccess();
    } catch (err) {
      handleAuthError(err);
    }
  };

  return (
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
          Join Us!
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
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme="teal" w="full" mt={3} onClick={signUp}>
          Sign Up
        </Button>
        <VStack spacing={1} align="stretch" w="100%">
          <Text mt={6} fontSize="sm" align="center">
            Already have an account?
          </Text>

          <ChakraLink
            as={ReactRouterLink}
            color="teal"
            textAlign="center"
            fontWeight="bold"
            to="/auth"
          >
            Sign In
          </ChakraLink>
        </VStack>
      </VStack>
    </Card>
  );
};

export default SignUp;
