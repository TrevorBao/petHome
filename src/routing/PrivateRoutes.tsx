import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { Spinner } from "@chakra-ui/react";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner size="xl" />;

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
