import {
  Box,
  Button,
  Container,
  Text,
  Link,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Logo from "../../assets/logo.png";
import { FormInput, PasswordInput } from "../common";
import { getSignInSchema } from "../validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInPayload } from "./interface";
import { useSigninMutation } from "../../resolvers";

const SignIn = () => {
  const { signIn, loading } = useSigninMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignInPayload>({
    resolver: yupResolver(getSignInSchema()),
  });

  async function onSubmit(values: SignInPayload) {
    const identifier = getValues("identifier");
    const password = getValues("password");
    try {
      await signIn({ identifier, password });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6}>
            <FormInput
              label="Email Or Phone Number*"
              type="text"
              {...register("identifier")}
              error={errors.identifier?.message}
            />
            <PasswordInput
              label="Password*"
              {...register("password")}
              error={errors.password?.message}
            />
            <Link alignSelf="flex-end" fontSize="small" mb={2} href="#">
              Forgot Password?
            </Link>
            <Button
              type="submit"
              bgColor={"#f4a261"}
              _hover={{ backgroundColor: "#f7ba8a" }}
              color="#fff"
              isLoading={isSubmitting || loading}
              loadingText="Signing In..."
              width="full"
              mt={4}
            >
              Sign In
            </Button>
            <HStack justifyContent="flex-end" fontSize={"small"} mt="2">
              <Text> New to DevSpot?</Text>
              <Link
                href="/sign-up"
                color="#f4a261"
                textDecoration="underline"
                fontWeight={"600"}
              >
                Create an account
              </Link>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
