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

const NavBarNotRegistered = () => {
  const { onOpen } = useDisclosure();

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
          <Image src={logo} boxSize="32px" alt="Logo" />
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

        <Box display={{ md: "none" }} onClick={onOpen}></Box>
      </Box>

      <Flex align="center">
        <Button
          variant="ghost"
          colorScheme="teal"
          as={ReactRouterLink}
          to="/auth"
          mx={2}
          size="sm"
        >
          Log in
        </Button>
        <Button
          as={ReactRouterLink}
          to="/auth/register"
          mx={2}
          colorScheme="teal"
          size="sm"
        >
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBarNotRegistered;
