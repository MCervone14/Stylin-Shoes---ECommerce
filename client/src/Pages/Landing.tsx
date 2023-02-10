import { Box } from "@chakra-ui/react";
import ImageCarousel from "../Features/Carousel/ImageCarousel";
import { products } from "../Features/GridGroup/_data";
import ProductGrid from "../Features/GridGroup/ProductGrid";
import ProductCard from "../Features/GridGroup/ProductCard";

const Landing = () => {
  return (
    <div>
      <ImageCarousel />
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </Box>
    </div>
  );
};

export default Landing;
