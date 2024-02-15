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
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { NavLink as ReactRouterLink } from "react-router-dom";
import CustomNavLink from "./CustomNavLink";
import { UserProps } from "../hooks/useUsers";

interface Props {
  user: UserProps;
}

const NavBar = ({ user }: Props) => {
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
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.008)"
    >
      <Flex align="center" mr={5} ml={2}>
        <CustomNavLink to="/pet">
          <Image
            src={logo}
            boxSize={{ base: "20px", md: "32px", xl: "46px" }}
            alt="Logo"
          />
        </CustomNavLink>
      </Flex>

      <Box
        display={{ md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <CustomNavLink to="/pet" px={2}>
          Home
        </CustomNavLink>
        <CustomNavLink to="/pet/add" px={2}>
          Adoption
        </CustomNavLink>
        <CustomNavLink to="/pet/add" px={2}>
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
            <Avatar
              width={{ base: "20px", md: "32px", xl: "46px" }}
              height={{ base: "20px", md: "32px", xl: "46px" }}
              src={user.avatarUrl}
            />
          </MenuButton>
          <MenuList>
            <MenuGroup title={`Hi, ${user.userName}!`}>
              <MenuItem as={ReactRouterLink} to={`/user/${user.userId}`}>
                Profile
              </MenuItem>
              <MenuItem as={ReactRouterLink} to="/pet/add">
                Rehome
              </MenuItem>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
