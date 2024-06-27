import React, { useState } from "react";
import { Box, Button, Container, Image, HStack } from "@chakra-ui/react";
import Logo from "../../../assets/logo.png";
import SignUpStepOne from "./SignUpStepOne";
import SignUpStepTwo from "./SignUpStepTwo";

const SignUp = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // signup
    }
  };

  return (
    <Container
      centerContent
      maxW="md"
      h="100vh"
      justifyContent="center"
      className="login-container"
    >
      <Box
        p="2rem"
        boxShadow="0px 4px 40px rgba(0, 0, 0, 0.1)"
        borderRadius="16px"
        w="100%"
        bg="#fff"
      >
        <HStack justifyContent={"center"} pb="3rem">
          <Image src={Logo} w="10rem" />
        </HStack>
        {step === 1 && <SignUpStepOne />}
        {step === 2 && <SignUpStepTwo />}
        <Button
          type="submit"
          bgColor={"#f4a261"}
          _hover={{ backgroundColor: "#f7ba8a" }}
          color="#fff"
          isLoading={false}
          onClick={handleSubmit}
          loadingText="Signing Up..."
          width="full"
          mt={6}
        >
          {step === 1 ? "Next" : "Sign Up"}
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
