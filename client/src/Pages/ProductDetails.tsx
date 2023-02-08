import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Alert,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
  Spinner,
  AlertIcon,
} from "@chakra-ui/react";
import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { getProduct } from "../Redux/Actions/productActions";
import { addCartItem } from "../Redux/Actions/cartActions";
import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const ProductDetails = () => {
  const [amount, setAmount] = useState(1);
  const params = useParams();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { loading, error, product } = products;

  console.log(products);
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    //@ts-ignore
    dispatch(getProduct(params.id));
  }, [params.id, dispatch, cart]);

  const changeAmount = (input: string) => {
    if (input === "plus") return setAmount(amount + 1);
    if (input === "minus") return setAmount(amount - 1);
  };

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({
      description: "Item has been added.",
      status: "success",
      isClosable: true,
    });
  };

  if (loading)
    return (
      <Stack direction="row" spacing={4}>
        <Spinner
          mt={20}
          thickness="2px"
          speed=".65s"
          emptyColor="gray.200"
          color="orange.500"
          size="xl"
        />
      </Stack>
    );

  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Sorry, there was an error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );

  return (
    <Wrap spacing="30px" justify="center" minH="100vh" pt={10}>
      {product && (
        <Box
          maxW={{ base: "3xl", lg: "5xl" }}
          mx="auto"
          px={{ base: 4, md: 8, lg: 12 }}
          py={{ base: 6, md: 8, lg: 12 }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
          >
            <Stack
              pr={{ base: 0, md: 12 }}
              spacing={{ base: 8, md: 4 }}
              flex="1.5"
              mb={{ base: 12, md: "none" }}
            >
              <Flex justify="center">
                <Image
                  src={product.image}
                  alt={product.name}
                  h="auto"
                  width="50%"
                />
              </Flex>
              <HStack>
                {product.productIsNew && (
                  <Badge
                    rounded="full"
                    w="40px"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge
                    rounded="full"
                    w="70px"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    Sold Out
                  </Badge>
                )}
                <Heading fontSize="2xl" fontWeight="extrabold">
                  {product.name}
                </Heading>
              </HStack>
              <Stack spacing={5}>
                <Box>
                  <Text fontSize="xl">${product.price}</Text>
                  <Flex>
                    <HStack spacing="2px">
                      <StarIcon color="orange.500" />
                      <StarIcon
                        color={product.rating >= 2 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={product.rating >= 3 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={product.rating >= 4 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={product.rating >= 5 ? "orange.500" : "gray.200"}
                      />
                    </HStack>
                    <Text fontSize="md" fontWeight="bold" ml="4px">
                      {product.numberOfReviews} Reviews
                    </Text>
                  </Flex>
                </Box>
                <Text>{product.description}</Text>
                <Text fontWeight="bold">Quantity</Text>
                <Flex
                  w="170px"
                  p="5px"
                  border="1px"
                  borderColor="gray.200"
                  alignItems="center"
                >
                  <Button
                    isDisabled={amount <= 1}
                    onClick={() => changeAmount("minus")}
                  >
                    <MinusIcon />
                  </Button>
                  <Text mx="20px">{amount}</Text>
                  <Button
                    isDisabled={amount >= product.stock}
                    onClick={() => changeAmount("plus")}
                  >
                    <SmallAddIcon w="20px" h="25px" />
                  </Button>
                </Flex>
                <Text> Quantity of stock: {product.stock} </Text>
                <Button
                  colorScheme="orange"
                  isDisabled={product.stock === 0}
                  onClick={() => addItem()}
                >
                  Add to Cart
                </Button>
                <Stack width="270px">
                  <Flex alignItems="center">
                    <BiPackage size="20px" />
                    <Text fontWeight="medium" fontSize="sm" ml={2}>
                      Free Shipping if order is above $99.99!
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <BiCheckShield size="20px" />
                    <Text fontWeight="medium" fontSize="sm" ml={2}>
                      30 day return policy!
                    </Text>
                  </Flex>
                </Stack>
              </Stack>
              <Stack>
                <Text fontSize="xl" fontWeight="bold">
                  Reviews
                </Text>
                <SimpleGrid
                  minChildWidth="300px"
                  spacingX="40px"
                  spacingY="20px"
                >
                  {product.reviews.map((review) => (
                    <Box key={review._id}>
                      <Flex alignItems="center">
                        <StarIcon color="orange.500" />
                        <StarIcon
                          color={
                            product.rating >= 2 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 3 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 4 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 5 ? "orange.500" : "gray.200"
                          }
                        />
                        <Text fontWeight="semibold" ml="4px">
                          {review.title && review.title}
                        </Text>
                      </Flex>
                      <Box py="12px">{review.comment}</Box>
                      <Text fontSize="sm" color="gray.400">
                        by {review.name},{" "}
                        {new Date(review.createdAt).toDateString()}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default ProductDetails;
