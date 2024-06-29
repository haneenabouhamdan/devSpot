import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import "@/index.scss";
import { GraphQLProvider, AuthenticationProvider } from "./providers";
import { Helmet } from 'react-helmet';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GraphQLProvider>
      <AuthenticationProvider>
        <RouterProvider router={router} />
        <Helmet  defaultTitle="DevSpot" />
      </AuthenticationProvider>
    </GraphQLProvider>
  </React.StrictMode>
);