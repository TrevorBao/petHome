import { useState } from "react";
import { auth, googleprovider } from "../firebase";
import logoWithText from "../assets/logowithtext.svg";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Box, Link as ChakraLink, Flex, Icon } from "@chakra-ui/react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Image,
  Text,
  Heading,
  useToast,
  Center,
  Card,
  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [rememberMe, setRememberMe] = useState(false);

  const toast = useToast();

  const handleAuthError = () => {
    toast({
      title: "Sign In Failed",
      description: "Invalid Email or Password",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAuthSuccess = () => {
    navigate("/");
  };

  const SignIn = async () => {
    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess();
    } catch (err) {
      handleAuthError();
    }
  };

  const SignInWithGoogle = async () => {
    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithPopup(auth, googleprovider);
      handleAuthSuccess();
    } catch (err) {
      handleAuthError();
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
          Welcome back!
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
        <HStack justify="space-between" width="full">
          <Checkbox
            colorScheme="teal"
            onChange={(e) => setRememberMe(e.target.checked)}
          >
            Remember me
          </Checkbox>
          <Button
            colorScheme="teal"
            textAlign="right"
            variant="link"
            _hover={{ color: "teal.700", textDecoration: "none" }}
            onClick={() => navigate("/auth/reset")}
          >
            Forgot password
          </Button>
        </HStack>
        <Button colorScheme="teal" w="full" onClick={SignIn}>
          Log In
        </Button>
        <Button colorScheme="gray" w="full" onClick={SignInWithGoogle}>
          <Flex justify="space-between" align="center" w="full">
            <Icon as={FcGoogle} boxSize={5} />
            <Text>Sign In With Google</Text>
            <Box> </Box>
          </Flex>
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
            to="/auth/register"
          >
            Sign up
          </ChakraLink>
        </VStack>
      </VStack>
    </Card>
  );
};

export default SignIn;
