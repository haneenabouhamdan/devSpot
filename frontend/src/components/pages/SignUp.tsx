import {
  Box,
  Container,
  Image,
  HStack,
  Button,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import Logo from "../../assets/logo.png";
import { SignUpPayload } from "./interface";
import { getSignupSchema } from "../validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../common";
import "./styles.scss";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpPayload>({
    resolver: yupResolver(getSignupSchema()),
  });

  function onSubmit(values: SignUpPayload) {
    // Handle form submission logic here
    console.log(values);
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
        <HStack justifyContent={"center"} pb="1rem">
          <Image src={Logo} w="10rem" />
        </HStack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormInput
              label="Name*"
              type="text"
              {...register("username")}
              error={errors.username?.message}
            />
            <FormInput
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <FormInput
              label="Phone Number*"
              type="text"
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
            />
            <FormInput
              label="Password*"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
            <FormInput
              label="Confirm Password*"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              backgroundColor={"#f4a261"}
              color="#fff"
              isLoading={isSubmitting}
              loadingText="Signing Up..."
              width="full"
              mt={4}
            >
              Sign Up
            </Button>
          </VStack>
        </form>
        <HStack justifyContent="center" fontSize={"small"} mt="6">
          <Text> Already have an account?</Text>
          <Link
            href="/sign-in"
            textDecoration="underline"
            color={"#f4a261"}
            fontWeight={"600"}
          >
            Sign In
          </Link>
        </HStack>
      </Box>
    </Container>
  );
};

export default SignUp;
