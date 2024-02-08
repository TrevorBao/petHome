import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Image,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NavLink as ReactRouterLink } from "react-router-dom";
import CustomNavLink from "./CustomNavLink";

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
      padding="0.6rem"
      bg="white"
      color="black"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.16)"
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
      </Box>

      <Flex align="center" mr={2}>
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
