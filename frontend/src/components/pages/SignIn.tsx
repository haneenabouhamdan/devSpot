import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Text,
  Input,
  Link,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Logo from "../../assets/logo.png";

const SignIn = () => {
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
          <FormControl id="username" isRequired>
            <FormLabel fontWeight={"400"}>Email or Phone Number</FormLabel>
            <Input
              type="text"
              _focus={{ borderColor: "#4D148C" }}
              autoComplete="username"
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
          <Link alignSelf="flex-end" fontSize="small" mb={2} href="#">
            Forgot Password?
          </Link>
          <Button
            type="submit"
            bgColor={"#f4a261"}
            _hover={{ backgroundColor: "#f7ba8a" }}
            color="#fff"
            isLoading={false}
            loadingText="Signing In..."
            width="full"
            mt={4}
          >
            Sign In
          </Button>
          <HStack justifyContent="flex-end" fontSize={"small"} mt="2">
            <Text> New to DevSpot?</Text>
            <Link href="#" color="#f4a261" fontWeight={"600"}>
              Create an account
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default SignIn;
