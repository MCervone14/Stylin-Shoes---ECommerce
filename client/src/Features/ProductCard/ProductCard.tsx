import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Button,
  Tooltip,
  Stack,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { StarIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";
import { useState } from "react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    image: string;
    productIsNew: boolean;
    stock: number;
    price: number;
    rating: number;
    numberOfReviews: number;
  };
}

interface IRating {
  rating: number;
  numberOfReviews: number;
}

const Rating = ({ rating, numberOfReviews }: IRating) => {
  const [iconSize, setIconSize] = useState("14px");
  return (
    <Flex>
      <HStack spacing="2px">
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 1 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 2 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 3 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 4 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          boxSize={iconSize}
          w="14px"
          color={rating >= 5 ? "orange.500" : "gray.200"}
        />
      </HStack>
      <Text fontSize="md" fontWeight="bold" ml="4px">
        {`${numberOfReviews} ${numberOfReviews === 1 ? "Review" : "Reviews"}`}
      </Text>
    </Flex>
  );
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Stack
      p={2}
      spacing="3px"
      bg={useColorModeValue("#ffffff", "gray.800")}
      minW="240px"
      h="400px"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
    >
      {product.productIsNew && (
        <Circle
          size="10px"
          position="absolute"
          top={2}
          right={2}
          bg="green.300"
        />
      )}
      {product.stock <= 0 && (
        <Circle
          size="10px"
          position="absolute"
          top={2}
          right={2}
          bg="red.300"
        />
      )}
      <Image
        src={product.image}
        alt={product.name}
        roundedTop="lg"
        objectFit="cover"
        h="200px"
      />
      <Box flex="1" maxH="5" alignItems="baseline">
        {product.stock <= 0 && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            Sold Out
          </Badge>
        )}
        {product.productIsNew && (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
            New
          </Badge>
        )}
      </Box>

      <Flex mt="1" justifyContent="space-between" alignContent="center">
        <Link
          as={ReactLink}
          to={`/product${product._id}`}
          pt="2"
          cursor="pointer"
        >
          <Box fontSize="2xl" fontWeight="semibold" lineHeight="tight">
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex justifyContent="space-between" alignContent="center" py="2">
        <Rating
          rating={product.rating}
          numberOfReviews={product.numberOfReviews}
        />
      </Flex>
      <Flex justify="space-between">
        <Box fontSize="2xl" color={useColorModeValue("gray.800", "#ffffff")}>
          <Box
            as="span"
            color={useColorModeValue("gray.600", "gray.100")}
            fontSize="lg"
          >
            $
          </Box>
          {product.price.toFixed(2)}
        </Box>
        <Tooltip
          label="Add to cart"
          bg="#ffffff"
          placement="top"
          color="gray.800"
          fontSize="1.2em"
        >
          <Button variant="ghost" display="flex" disabled={product.stock <= 0}>
            <Icon as={FiShoppingCart} h={7} w={7} alignSelf="center" />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
