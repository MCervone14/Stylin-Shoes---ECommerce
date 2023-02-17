import { Box, Heading, Spinner } from "@chakra-ui/react";
import ImageCarousel from "../Components/Carousel/ImageCarousel";
import ProductGrid from "../Components/ProductGrid/ProductGrid";
import ProductCard from "../Components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useEffect, useState } from "react";
import { getProducts } from "../Redux/Actions/productActions";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getProducts());

    return () => {
      setIsLoading(false);
    };
  }, [dispatch]);

  return (
    <div>
      <ImageCarousel />
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Heading mb={5}>Featured</Heading>
        {isLoading ? (
          <ProductGrid>
            {products
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
              .slice(0, 4)}
          </ProductGrid>
        ) : (
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        )}
        <Heading mb={5} mt={5}>
          Stylin Kicks
        </Heading>
        {isLoading ? (
          <ProductGrid>
            {products
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
              .slice(4, 8)}
          </ProductGrid>
        ) : (
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        )}
      </Box>
    </div>
  );
};

export default Landing;
