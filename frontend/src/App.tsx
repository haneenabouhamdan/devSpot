
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import SignUp from "./components/pages/signUp/SignUp";
// import SignIn from "./components/pages/SignIn";

const App = () => (
  <div className="App">
    <ChakraProvider>
      {/* <SignIn /> */}
<SignUp />
    </ChakraProvider>
  </div>
);

export default App;
