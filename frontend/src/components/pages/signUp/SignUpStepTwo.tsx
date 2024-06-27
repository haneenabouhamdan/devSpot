import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import AvatarUploader from "../../common/AvatarUploader";

const SignUpStepTwo = () => {
  return (
    <VStack direction={"column"} as="form" spacing={4} noValidate>
      <AvatarUploader />
      <FormControl id="JobTitle">
        <FormLabel fontWeight={"400"}>Job Title</FormLabel>
        <Input
          type="text"
          _focus={{ borderColor: "#4D148C" }}
          autoComplete="jobTitle"
          autoFocus
        />
      </FormControl>
      <FormControl id="Bio">
        <FormLabel fontWeight={"400"}>Bio</FormLabel>
        <Input
          type="text"
          _focus={{ borderColor: "#4D148C" }}
          autoComplete="Bio"
          autoFocus
        />
      </FormControl>
      <FormControl id="DateOfBirth" mb="1">
        <FormLabel fontWeight={"400"}>Date Of Birth</FormLabel>
        <Input
          type="date"
          _focus={{ borderColor: "#4D148C" }}
          autoComplete="Date Of Birth"
          autoFocus
        />
      </FormControl>
    </VStack>
  );
};
export default SignUpStepTwo;
