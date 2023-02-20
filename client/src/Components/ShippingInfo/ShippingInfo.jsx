import {
  Box,
  Heading,
  Stack,
  Text,
  RadioGroup,
  Radio,
  FormControl,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setExpress } from "../../Redux/Actions/cartActions";
import { useState } from "react";
import {
  setShippingAddress,
  setShippingAddressError,
} from "../../Redux/Actions/orderActions";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "../InputFields/TextField";

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const [formStateChanged, setFormStateChanged] = useState(false);

  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <Formik
      initialValues={{ address: "", postalCode: "", city: "", country: "" }}
      validationSchema={Yup.object({
        address: Yup.string().required("An email address is required."),
        postalCode: Yup.number()
          .min(5, "Must enter 5 digit zip code.")
          .required("Zip code is required."),
        city: Yup.string().required("City input is required"),
        country: Yup.string().required("Country input is required"),
      })}
      onSubmit={(values) => {}}
    >
      {(formik) => (
        <VStack as="form">
          <FormControl
            onChange={() =>
              Object.keys(formik.errors).length === 0 &&
              Object.keys(formik.touched).length >= 2
                ? setErrorState(false, formik.values)
                : setErrorState(true)
            }
          >
            <TextField name="address" label="Street Address" type={""} />
            <Flex>
              <Box flex="1" mr="10">
                <TextField
                  name="postalCode"
                  label="Postal Code"
                  type="number"
                />
              </Box>
              <Box flex="2">
                <TextField name="city" label="City" type={""} />
              </Box>
            </Flex>
            <TextField name="country" label="Country" type={""} />
          </FormControl>
          <Box w="100%" h="100vh" pr={5}>
            <Heading fontSize="2xl" fontWeight="extrabold" mb={10}>
              Shipping Method
            </Heading>
            <RadioGroup
              defaultValue="false"
              onChange={(e) => dispatch(setExpress(e))}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
              >
                <Stack pr={10} spacing={{ base: 8, md: 10 }} flex="1.5">
                  <Box>
                    <Radio value="true">
                      <Text fontWeight="bold">Express $29.99</Text>
                      <Text>Shipped within 24 hours</Text>
                    </Radio>
                  </Box>
                  <Stack spacing={6}>Express</Stack>
                </Stack>
                <Radio value="false">
                  <Text fontWeight="bold">Standard $4.99</Text>
                  <Text>Shipped within 3-5 days</Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default ShippingInfo;
