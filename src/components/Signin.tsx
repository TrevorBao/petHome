import logoWithText from "../assets/logowithtext.svg";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
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
  Center,
  Card,
  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface SignInProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  setRememberMe: (value: boolean) => void;
  show: boolean;
  handleClick: () => void;
  signIn: () => Promise<void>;
  handleNavigation: (value: string) => void;
}

const SignIn = ({
  email,
  setEmail,
  password,
  setPassword,
  setRememberMe,
  show,
  handleClick,
  signIn,
  handleNavigation,
}: SignInProps) => {
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
            autoComplete="true"
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
            name="remember"
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
            onClick={() => handleNavigation("/auth/reset")}
          >
            Forgot password
          </Button>
        </HStack>
        <Button colorScheme="teal" w="full" onClick={signIn}>
          Log In
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
