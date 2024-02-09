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

const router = createBrowserRouter([
  // path: "/", element: component
  {
    path: "/",
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
        path: "/pet",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: ":id", element: <PetDetailPage /> },
          { path: "add", element: <AddPetPage /> },
        ],
      },
    ],
  },
]);

export default router;
