import {
  Center,
  Wrap,
  WrapItem,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import ProductCard from "../Features/ProductCard/ProductCard";
import { getProducts } from "../Redux/Actions/productActions";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useEffect } from "react";
const ProductsCatalog = () => {
  const dispatch = useAppDispatch();
  const { loading, error, products } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const errorMessage = (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Sorry, there was an error!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  return (
    <Wrap spacing="50px" justify="center" minHeight="100vh" mx="300px">
      {error
        ? errorMessage
        : products.map((product) => (
            <WrapItem>
              <Center w="250px" h="550px">
                <Skeleton isLoaded={!loading}>
                  <ProductCard product={product} />
                </Skeleton>
              </Center>
            </WrapItem>
          ))}
    </Wrap>
  );
};

export default ProductsCatalog;
