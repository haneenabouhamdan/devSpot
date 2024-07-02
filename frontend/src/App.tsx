import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router";
import "./App.scss";
import { MainHelmet } from "./pages/MainHelmet";

const App = () => (
  <div className="App">
    <ChakraProvider>
      <MainHelmet />
      <Outlet />
    </ChakraProvider>
  </div>
);

export default App;
