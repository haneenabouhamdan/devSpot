import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

const SignUpStepOne = () => {
  return (
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
  );
};
export default SignUpStepOne