import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import RegisterPage from "./RegisterPage";
import ResetPasswordPage from "./ResetPasswordPage";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import AddPetPage from "./AddPetPage";
import PetDetailPage from "./PetDetailPage";
import UserProfilePage from "./UserProfilePage";

const router = createBrowserRouter([
  // path: "/", element: component
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LogInPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "reset", element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: ":id", element: <PetDetailPage /> },
          { path: "add", element: <AddPetPage /> },
        ],
      },
      {
        path: "/user",
        element: <Layout />,
        children: [{ path: ":id", element: <UserProfilePage /> }],
      },
    ],
  },
]);

export default router;
