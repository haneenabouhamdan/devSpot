import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";
import { useField } from "formik";

interface FormInputProps extends InputProps {
  label: string;
  name: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props as any);
  return (
    <FormControl id={props.id} isRequired isInvalid={!!meta.touched && !!meta.error}>
      <FormLabel fontWeight="400">{label}</FormLabel>
      <Input {...field} {...props} _focus={{ borderColor: "#4D148C" }} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
