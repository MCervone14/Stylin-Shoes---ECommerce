import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Wrap,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import CartItem from "../Features/Cart/CartItem";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import CartOrderSummary from "../Features/Cart/CartOrderSummary";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const { loading, error, cart } = useAppSelector((state) => state.cart);

  const errorMessage = (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Sorry, there was an error!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  return (
    <Wrap spacing="50px" justify="center" minHeight="100vh" mx="300px">
      {error ? (
        errorMessage
      ) : cart.length <= 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Your cart is empty</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to="/products">
              Click here to see our products
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: 4, md: 8, lg: 12 }}
          py={{ base: 6, md: 8, lg: 12 }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: 8, md: 16 }}
          >
            <Stack spacing={{ base: 8, md: 10 }} flex={2}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Shopping Cart
              </Heading>

              <Stack spacing={6}>
                {cart.map((cartItem) => (
                  //@ts-ignore
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary />
              <HStack mt={6} fontWeight="semibold">
                <p>or</p>
                <Link
                  as={ReactLink}
                  to="/products"
                  color={mode("orange.500", "orange.200")}
                >
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default ShoppingCart;
