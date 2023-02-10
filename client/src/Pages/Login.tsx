import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "../Features/Login/OAuthButtonGroup";
import { useAppSelector, useAppDispatch } from "../Redux/hooks";
import { FormikProps, Form, Field, withFormik, FormikErrors } from "formik";
import { useNavigate, Link as ReactLink, useLocation } from "react-router-dom";
import { login } from "../Redux/Actions/userActions";
import { useEffect } from "react";

interface FormValues {
  email: string;
  password: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
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
        Sign In
      </button>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = "/products";

  const toast = useToast();

  const { userInfo, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({
        description: "Login successful",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, location.state, toast]);

  const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: (props) => {
      return {
        email: props.initialEmail || "",
        password: "",
      };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.email) {
        errors.email = "Required";
      }
      return errors;
    },

    handleSubmit: (values) => {
      dispatch(login(values.email, values.password));
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
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button
                as={ReactLink}
                to="/register"
                variant="link"
                colorScheme="blue"
              >
                Sign up
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
            <Stack spacing="6">
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
