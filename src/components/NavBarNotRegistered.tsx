import { Flex, Box, Image, Button, useDisclosure } from "@chakra-ui/react";
import { NavLink as ReactRouterLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import CustomNavLink from "./CustomNavLink";

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
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)"
    >
      <Flex align="center" mr={5} ml={2}>
        <CustomNavLink to="/">
          <Image src={logo} boxSize="32px" alt="Logo" />
        </CustomNavLink>
      </Flex>

      <Box
        display={{ md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <CustomNavLink to="/" px={2}>
          Home
        </CustomNavLink>
        <CustomNavLink to="/auth" px={2}>
          Adoption
        </CustomNavLink>
        <CustomNavLink to="/auth" px={2}>
          Chat
        </CustomNavLink>

        <Box display={{ md: "none" }} onClick={onOpen}></Box>
      </Box>

      <Flex align="center" mr={2}>
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
