import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";
import { useState } from "react";
import { InputRightElement, Button, InputGroup } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface PasswordFieldProps {
  label: string;
  type: string;
  name: string;
}

const PasswordField = ({ label, type, name }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ type, name });
  return (
    <FormControl
      isInvalid={meta.error && meta.touched ? true : undefined}
      mb="6"
    >
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          {...field}
          type={showPassword ? "text" : type}
          name={name}
        />
        <InputRightElement h="full">
          <Button
            variant="ghost"
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordField;
