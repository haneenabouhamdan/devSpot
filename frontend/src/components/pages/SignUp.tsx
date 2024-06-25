import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Logo from "../../assets/logo.png";

const SignUp = () => {
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
        <VStack direction={"column"} as="form" spacing={4} noValidate>
          <FormControl id="email">
            <FormLabel fontWeight={"400"}>Email</FormLabel>
            <Input
              type="email"
              _focus={{ borderColor: "#4D148C" }}
              autoComplete="email"
              autoFocus
            />
          </FormControl>
          <FormControl id="phone-number" isRequired>
            <FormLabel fontWeight={"400"}>Phone Number</FormLabel>
            <Input
              type="text"
              _focus={{ borderColor: "#4D148C" }}
              autoComplete="Phone Number"
              autoFocus
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel fontWeight={"400"}>Password</FormLabel>
            <Input
              type="password"
              _focus={{ borderColor: "#4D148C" }}
              autoComplete="current-password"
            />
          </FormControl> 
           <FormControl id="password" isRequired>
            <FormLabel fontWeight={"400"}>Confirm Password</FormLabel>
            <Input
              type="password"
              _focus={{ borderColor: "#4D148C" }}
              autoComplete="confirm-password"
            />
          </FormControl>
          </VStack>
        <Button
            type="submit"
            bgColor={"#f4a261"}
            _hover={{ backgroundColor: "#f7ba8a" }}
            color="#fff"
            isLoading={false}
            loadingText="Signing Up..."
            width="full"
            mt={6}
          >
            Sign Up
          </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
