import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useToast,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  updateProfile,
  resetUpdateSuccess,
} from "../Redux/Actions/userActions";
import { useLocation, Navigate } from "react-router-dom";

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
        Save
      </button>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
}

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

  const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values

    mapPropsToValues: () => {
      return {
        name: userInfo!.name,
        email: userInfo!.email,
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
      dispatch(
        updateProfile(userInfo!._id, values.name, values.email, values.password)
      );
    },
  })(InnerForm);

  return userInfo ? (
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
            <Stack spacing={5}>
              <FormControl>
                <MyForm />
              </FormControl>
            </Stack>
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
                  Registered on {new Date(userInfo.createdAt).toDateString()}
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Flex>
      </Stack>
    </Box>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default Profile;
