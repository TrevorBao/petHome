import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes.tsx";
import { VideoCallProvider } from "./contexts/VideoCallContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <VideoCallProvider>
        <RouterProvider router={router}></RouterProvider>
      </VideoCallProvider>
    </ChakraProvider>
  </React.StrictMode>
);
