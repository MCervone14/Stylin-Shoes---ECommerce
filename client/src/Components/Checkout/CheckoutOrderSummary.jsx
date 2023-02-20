import {
  useColorModeValue as mode,
  Link,
  Text,
  Stack,
  Flex,
  Badge,
  Heading,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { createOrder, resetOrder } from "../../Redux/Actions/orderActions";
import { resetCart } from "../../Redux/Actions/cartActions";
import { useEffect, useState, useCallback } from "react";
import CheckoutItem from "./CheckoutItem";
import PayPalButton from "../PayPal/PayPalButton";
import PayPalSuccess from "../PayPal/PayPalSuccess";
import PayPalError from "../PayPal/PayPalError";

const CheckoutOrderSummary = () => {
  const {
    onClose: onErrorClose,
    onOpen: onErrorOpen,
    isOpen: isErrorOpen,
  } = useDisclosure();
  const {
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
    isOpen: isSuccessOpen,
  } = useDisclosure();
  const colorMode = mode("gray.600", "gray.400");
  const { cart, expressShipping, subtotal } = useSelector(
    (state) => state.cart
  );
  const { userInfo } = useSelector((state) => state.user);
  const { error, shippingAddress } = useSelector((state) => state.order);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const shipping = useCallback(
    //@ts-ignore
    () => (expressShipping === "true" ? 29.99 : subtotal <= 99.99 ? 4.99 : 0),
    [expressShipping, subtotal]
  );

  const total = useCallback(
    () =>
      Number(
        shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()
      ).toFixed(2),
    [shipping, subtotal]
  );

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

  const onPaymentSuccess = async (data) => {
    onSuccessOpen();
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );
    dispatch(resetOrder());
    dispatch(resetCart());
  };

  const onPaymentError = () => {
    onErrorOpen();
  };

  return (
    <Stack spacing={8} rounded="xl" padding={8} width="100%">
      <Heading size="md">Order Summary</Heading>
      {cart.map((item) => (
        <CheckoutItem cartItem={item} key={item.id} />
      ))}

      <Stack spacing={6}>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            SubTotal
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {subtotal}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded="full" px={2} fontSize="0.8em" colorScheme="green">
                Free
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold" color={colorMode}>
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold" color={colorMode}>
            ${Number(total())}
          </Text>
        </Flex>
      </Stack>
      <PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        isDisabled={buttonDisabled}
      />
      <HStack mt={6} fontWeight="semibold" justify="center">
        <p>or</p>
        <Link as={ReactLink} to="/products" color={mode("red.500", "red.200")}>
          Continue Shopping
        </Link>
      </HStack>
      <PayPalError
        onClose={onErrorClose}
        onOpen={onErrorOpen}
        isOpen={isErrorOpen}
      />
      <PayPalSuccess
        onClose={onSuccessClose}
        onOpen={onSuccessOpen}
        isOpen={isSuccessOpen}
      />
    </Stack>
  );
};

export default CheckoutOrderSummary;
