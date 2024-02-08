import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Image,
  Link,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const NavBarSignIn = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userQuery = query(
          collection(db, "userInfo"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(userQuery);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        if (userData.length > 0) {
          setUsername(userData[0].userName);
          setAvatarUrl(userData[0].avatarUrl);
        }
      }
    });

    return () => unsubscribe();
  }, []);

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
        <Link as={ReactRouterLink} to="/" px={2}>
          Adoption
        </Link>
        <Link as={ReactRouterLink} to="/" px={2}>
          Chat
        </Link>
      </Box>

      <Flex align="center">
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size="sm" src={avatarUrl} />
          </MenuButton>
          <MenuList>
            <MenuGroup title={`Hi, ${username}!`}>
              <MenuItem as={ReactRouterLink} to="/">
                Profile
              </MenuItem>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBarSignIn;
