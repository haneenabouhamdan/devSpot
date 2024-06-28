import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  ThemingProps,
} from "@chakra-ui/react";
import { forwardRef, LegacyRef, MutableRefObject, ReactNode } from "react";

interface SBInputProps
  extends Omit<
      InputProps,
      "variant" | "size" | "experimental_spaceX" | "experimental_spaceY"
    >,
    ThemingProps {
  ref?: LegacyRef<HTMLInputElement>;
  label?: ReactNode;
  error?: ReactNode;
  info?: ReactNode;
  rootProps?: FormControlProps;
  RefCallBack?: MutableRefObject<undefined>;
}

export const FormInput = forwardRef<HTMLInputElement, SBInputProps>(
  (props, ref) => {
    const { rootProps, label, error, ...inputProps } = props;
    return (
      <FormControl {...rootProps} isInvalid={!!error}>
        {label && <FormLabel fontWeight={"400"}>{label}</FormLabel>}
        <Input
          ref={ref}
          {...inputProps}
          _focus={{ borderColor: "#4D148C" }}
          _invalid={{ borderColor: "#c01b4a" }}
        />
        {!!error && (
          <FormErrorMessage color="#c01b4a">{error}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);
