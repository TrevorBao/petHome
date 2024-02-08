import { Link } from "@chakra-ui/react";
import { useMatch, useResolvedPath } from "react-router-dom";
import { NavLink as ReactRouterLink } from "react-router-dom";

const CustomNavLink = ({ to, children, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      as={ReactRouterLink}
      to={to}
      {...props}
      color={match ? "black" : "gray.500"}
    >
      {children}
    </Link>
  );
};

export default CustomNavLink;
