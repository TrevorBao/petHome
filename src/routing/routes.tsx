import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import RegisterPage from "./RegisterPage";
import ResetPasswordPage from "./ResetPasswordPage";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  // path: "/", element: component
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/auth",
    children: [
      { index: true, element: <LogInPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "reset", element: <ResetPasswordPage /> },
    ],
  },
]);

export default router;
