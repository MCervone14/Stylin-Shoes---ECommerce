import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { Form, Field, FormikErrors, FormikProps, withFormik } from "formik";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useNavigate } from "react-router-dom";
import { register } from "../Redux/Actions/userActions";
import { Link as ReactLink } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <FormLabel>Full Name</FormLabel>
      <Field
        type="name"
        name="name"
        style={{
          boxShadow: "0px -1px 2px 1px rgba(0,0,0,.3",
          width: "100%",
          marginBottom: "20px",
          padding: "8px",
          outline: "none",
        }}
      />
      {touched.name && errors.name && (
        <div style={{ color: "red", textAlign: "center" }}>{errors.name}</div>
      )}

      <FormLabel>Email</FormLabel>
      <Field
        type="email"
        name="email"
        style={{
          boxShadow: "0px -1px 2px 1px rgba(0,0,0,.3",
          width: "100%",
          marginBottom: "20px",
          padding: "8px",
          outline: "none",
        }}
      />
      {touched.email && errors.email && (
        <div style={{ color: "red", textAlign: "center" }}>{errors.email}</div>
      )}

      <FormLabel>Password</FormLabel>
      <Field
        type="password"
        name="password"
        style={{
          boxShadow: "0px -1px 2px 1px rgba(0,0,0,.3",
          width: "100%",
          marginBottom: "20px",
          padding: "8px",
          outline: "none",
        }}
      />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <FormLabel>Confirm Password</FormLabel>
      <Field
        type="password"
        name="confirmPassword"
        style={{
          boxShadow: "0px -1px 2px 1px rgba(0,0,0,.3",
          width: "100%",
          marginBottom: "20px",
          padding: "8px",
          outline: "none",
        }}
      />
      {touched.confirmPassword && errors.confirmPassword && (
        <div>{errors.confirmPassword}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: "blue",
          color: "#ffffff",
          width: "100%",
          padding: "8px",
          borderRadius: "5px",
        }}
      >
        Sign Up
      </button>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, userInfo } = useAppSelector((state) => state.user);
  const redirect = "/products";
  const toast = useToast();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: "Account created successfully!",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: (props) => {
      return {
        name: "",
        email: props.initialEmail || "",
        password: "",
        confirmPassword: "",
      };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.email) {
        errors.email = "Email is Required";
      }
      return errors;
    },

    handleSubmit: (values) => {
      dispatch(register(values.name, values.email, values.password));
    },
  })(InnerForm);

  return (
    //TODO: require longer password for production.
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Sign Up For an Account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already a user?</Text>
              <Button
                as={ReactLink}
                to="/login"
                variant="link"
                colorScheme="blue"
              >
                Sign in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg-surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            {error && (
              <Alert
                status="error"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <AlertIcon />
                <AlertTitle>Sorry, there was an error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Stack spacing="5">
              <FormControl>
                <MyForm />
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6"></Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
