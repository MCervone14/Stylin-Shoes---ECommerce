import {
  Flex,
  Select,
  useColorModeValue as mode,
  Image,
  Box,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../Redux/hooks";
import { addCartItem } from "../../Redux/Actions/cartActions";

interface CheckoutItemProps {
  cartItem: {
    id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
    qty: number;
  };
}

const CheckoutItem = ({
  cartItem: { id, name, image, price, stock, qty },
}: CheckoutItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Flex>
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Flex direction="column" align="stretch" flex={1} mx={2}>
          <Text noOfLines={2} maxW="150px">
            {name}
          </Text>
          <Spacer />
          <Select
            maxW="64px"
            focusBorderColor={mode("orange.500", "orange.200")}
            value={qty}
            onChange={(e) => {
              dispatch(addCartItem(id, parseInt(e.target.value)));
            }}
          >
            {[...Array(stock).keys()].map((stockValue) => (
              <option key={stockValue + 1} value={stockValue + 1}>
                {stockValue + 1}
              </option>
            ))}
          </Select>
        </Flex>
        <Box>
          <Text fontWeight="bold">${price}</Text>
        </Box>
      </Flex>
      <Divider bg={mode("gray.400", "gray.800")} />
    </>
  );
};

export default CheckoutItem;
