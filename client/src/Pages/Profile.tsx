import {
  Box,
  FormControl,
  Heading,
  Stack,
  useToast,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  updateProfile,
  resetUpdateSuccess,
} from "../Redux/Actions/userActions";
import { useLocation, Navigate } from "react-router-dom";
import TextField from "../Components/InputFields/TextField";
import PasswordField from "../Components/InputFields/PasswordField";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { userInfo, error, loading, updateSuccess } = useAppSelector(
    (state) => state.user
  );
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: "Profile saved",
        status: "success",
        isClosable: true,
      });
      dispatch(resetUpdateSuccess());
    }
  }, [updateSuccess, toast, dispatch]);

  return userInfo ? (
    <Formik
      initialValues={{
        email: userInfo.email,
        password: "",
        name: userInfo.name,
        confirmPassword: "",
      }}
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
        dispatch(
          updateProfile(
            userInfo._id,
            values.name,
            values.email,
            values.password
          )
        );
      }}
    >
      {(formik) => (
        <Box
          minH="100vh"
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: 4, md: 8, lg: 12 }}
          py={{ base: 6, md: 8, lg: 12 }}
        >
          <Stack
            spacing={10}
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
          >
            <Stack flex="1.5" mb={{ base: "2xl", md: "none" }}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Profile
              </Heading>
              <Stack spacing={6}>
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
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing={5}>
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
                      Save Info
                    </Button>
                  </Stack>
                </Form>
              </Stack>
            </Stack>
            <Flex
              direction="column"
              align="center"
              flex={1}
              _dark={{ bg: "gray.900" }}
            >
              <Card>
                <CardHeader>
                  <Heading size="md">User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={4}>
                    <Box pt={2} fontSize="sm">
                      Registered on{" "}
                      {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default Profile;
