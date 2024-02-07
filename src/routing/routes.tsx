import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Auth from "./Auth";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

const router = createBrowserRouter([
  // path: "/", element: component
  { path: "/", element: <HomePage /> },
  { path: "/auth", element: <Auth /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/reset", element: <ResetPassword /> },
]);

export default router;
