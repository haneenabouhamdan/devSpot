import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router";
import './App.scss';

const App = () => (
  <div className="App">
    <ChakraProvider>
     <Outlet/>
    </ChakraProvider>
  </div>
);

export default App;
