import {
  Flex,
  CloseButton,
  Select,
  useColorModeValue as mode,
  Stack,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../Redux/hooks";
import { addCartItem, removeCartItem } from "../../Redux/Actions/cartActions";

interface CartProps {
  cartItem: {
    id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
    qty: number;
  };
}

const CartItem = ({
  cartItem: { id, name, image, price, stock, qty },
}: CartProps) => {
  const dispatch = useAppDispatch();
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <Stack direction="row" spacing={5} width="full">
        <Image
          rounded="lg"
          w="120px"
          h="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt={4}>
          <Stack spacing={0.5}>
            <Text fontWeight="medium">{name}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        w="full"
        mt={{ base: 4, md: 0 }}
        align={{ base: "center", md: "baseline" }}
        justify="space-between"
        display="flex"
      >
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
        <Text fontWeight="bold">${price}</Text>
        <CloseButton onClick={() => dispatch(removeCartItem(id))} />
      </Flex>
    </Flex>
  );
};

export default CartItem;