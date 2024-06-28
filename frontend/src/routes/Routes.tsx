import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignUpRoutes } from "../components/routes/SignUp.Module";
import { SigninRoutes } from "../components/routes/Signin.Module";
import { PrivateTemplate, PublicTemplate } from "../Template";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<App />,
      children:[
        {
          path: 'sign-in',
          element: <PublicTemplate />,
          children: [SigninRoutes],
        },
        {
          path: 'sign-up',
          element: <PublicTemplate />,
          children: [SignUpRoutes],
        },
        {
            path: '/',
            element: <PrivateTemplate />,
            children: [],
          },
      ]
    },
  ]);
  