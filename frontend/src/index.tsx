import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { GraphQLProvider, AuthenticationProvider } from './providers';
import { Helmet } from 'react-helmet';
import reportWebVitals from './reportWebVitals';
import { router } from './routes/Routes';
import './index.scss';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GraphQLProvider>
        <AuthenticationProvider>
          <Helmet defaultTitle="DevSpot" />
          <RouterProvider router={router} />
        </AuthenticationProvider>
      </GraphQLProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
