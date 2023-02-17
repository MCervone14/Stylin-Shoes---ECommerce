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
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useNavigate } from "react-router-dom";
import { register } from "../Redux/Actions/userActions";
import { Link as ReactLink } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../Components/InputFields/TextField";
import PasswordField from "../Components/InputFields/PasswordField";

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

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("An name is required."),
        email: Yup.string()
          .email("Invalid email.")
          .required("An email address is required."),
        password: Yup.string()
          .min(1, "Password is too short - must contain at least 1 character.")
          .required("Password is required."),
        confirmPassword: Yup.string()
          .min(1, "Password is too short - must contain at least 1 character.")
          .required("Password is required.")
          .oneOf([Yup.ref("password"), null], "Passwords must match."),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {(formik) => (
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
              <Form onSubmit={formik.handleSubmit}>
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
                    <TextField type="text" name="name" label="Full name" />
                    <TextField type="text" name="email" label="Email" />
                    <PasswordField
                      type="password"
                      name="password"
                      label="Password"
                    />
                    <PasswordField
                      type="password"
                      name="confirmPassword"
                      label="Confirm your password"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    colorScheme="red"
                    size="lg"
                    fontSize="md"
                    isLoading={loading}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </Form>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default Register;
