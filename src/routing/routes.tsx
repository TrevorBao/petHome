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
import ChatPage from "./ChatPage";
import ChatRoom from "../components/ChatRoom";
import VideoCallComponent from "../components/VideoCallComponent";
import AdoptionPage from "./AdoptionPage";

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
      {
        path: "/adopt",
        element: <Layout />,
        children: [{ index: true, element: <AdoptionPage /> }],
      },
      {
        path: "/chat",
        element: <Layout />,
        children: [
          {
            path: ":userId",
            element: <ChatPage />,
            children: [
              {
                path: ":chatId",
                element: <ChatRoom />,
              },
              {
                path: ":chatId/call/:callId",
                element: <VideoCallComponent />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
