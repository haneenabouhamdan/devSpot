import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './components/pages/SignIn';
import { LoginRoutes } from './components/routes/Login.Module';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children:[
      {
        path: 'login',
        element: <SignIn />,
        children: [LoginRoutes],
      },
    ]
  },
]);

root.render(
  <React.StrictMode>
       {/* <AuthenticationProvider> */}
     <RouterProvider router={router} />
     {/* </AuthenticationProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
