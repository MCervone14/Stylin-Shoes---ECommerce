import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useAppSelector } from "../../Redux/hooks";

const CartOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const standardShipping = Number(4.99).toFixed(2);
  const { subtotal } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate("/checkout");
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" w="full">
      <Heading size="md">Order Summary</Heading>
      <Stack spacing={6}>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
            SubTotal
          </Text>
          <Text fontWeight="medium">${subtotal}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
            Shipping
          </Text>
          <Text fontWeight="medium">
            {subtotal <= 99.99 ? (
              standardShipping
            ) : (
              <Badge rounded="full" px={2} fontSize="0.8em" colorScheme="green">
                Free
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex
          fontSize="lg"
          fontWeight="semibold"
          justify="space-between"
          align="center"
        >
          <Text fontSize="xl" fontWeight="extrabold">
            Total:{" "}
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            $
            {subtotal <= 99.99
              ? (Number(subtotal) + Number(standardShipping)).toFixed(2)
              : subtotal}
          </Text>
        </Flex>
      </Stack>
      <Button
        as={ReactLink}
        to="/checkout"
        colorScheme="red"
        size="lg"
        fontSize="md"
        rightIcon={<ArrowRightIcon />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Proceed to Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
