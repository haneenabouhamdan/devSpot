import { FormControl, FormLabel, Switch, SwitchProps } from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";

interface SwitchInputProps extends SwitchProps {
  label?: ReactNode;
}

export const SwitchInput = forwardRef<HTMLInputElement, SwitchInputProps>(
  ({ label, ...switchProps }, ref) => {
    return (
      <FormControl display="flex" alignItems="center">
        {label && <FormLabel htmlFor={switchProps.id}>{label}</FormLabel>}
        <Switch ref={ref} {...switchProps} />
      </FormControl>
    );
  }
);
