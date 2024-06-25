
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import SignIn from "./components/pages/SignIn";

const App = () => (
  <div className="App">
    <ChakraProvider>
      <SignIn />
    </ChakraProvider>
  </div>
);

export default App;
