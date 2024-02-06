import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Auth from "./Auth";

const router = createBrowserRouter([
  // path: "/", element: component
  { path: "/", element: <HomePage /> },
  { path: "/auth", element: <Auth /> },
]);

export default router;
