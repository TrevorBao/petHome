import { Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import { NavLink as ReactRouterLink } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
  px?: number;
  onClick?: () => void;
}

const CustomNavLink = ({ to, children, px, onClick }: Props) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      as={ReactRouterLink}
      to={to}
      px={px}
      onClick={onClick}
      color={match ? "black" : "gray.500"}
    >
      {children}
    </Link>
  );
};

export default CustomNavLink;
