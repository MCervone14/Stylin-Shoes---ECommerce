import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

const TextField = ({ label, type, name }) => {
  const [field, meta] = useField({ type, name });
  return (
    <FormControl
      isInvalid={meta.error && meta.touched ? true : undefined}
      mb="6"
    >
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Field as={Input} {...field} type={type} name={name} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
