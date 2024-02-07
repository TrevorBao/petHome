import {
  Flex,
  Box,
  Image,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { User, signOut } from "firebase/auth";

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Unsubscribe from the listener when unmounting
    return () => unsubscribe();
  }, []);

  const { onOpen } = useDisclosure();

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding=".5rem"
      bg="white"
      color="black"
      boxShadow="sm"
      mb={4}
    >
      <Flex align="center" mr={5}>
        <Link as={ReactRouterLink} to="/">
          <Image src={logo} boxSize="40px" alt="Logo" />
        </Link>
      </Flex>

      <Box
        display={{ md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <Link as={ReactRouterLink} to="/" px={2}>
          Home
        </Link>
        {user ? (
          <>
            <Link as={ReactRouterLink} to="/" px={2}>
              Home
            </Link>
            <Link as={ReactRouterLink} to="/" px={2}>
              Adoption
            </Link>
            <Link as={ReactRouterLink} to="/" px={2}>
              Chat
            </Link>
          </>
        ) : (
          <Box display={{ md: "none" }} onClick={onOpen}></Box>
        )}
      </Box>

      <Flex align="center">
        {user ? (
          <>
            <Link as={ReactRouterLink} to="/">
              Profile
            </Link>
            <Button mx={2} onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              colorScheme="teal"
              as={ReactRouterLink}
              to="/auth"
              mx={2}
            >
              Log in
            </Button>
            <Button
              as={ReactRouterLink}
              to="/auth/register"
              mx={2}
              colorScheme="teal"
            >
              Sign up
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
