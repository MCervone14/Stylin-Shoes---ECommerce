import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ListItem,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
  Wrap,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserOrders } from "../Redux/Actions/userActions";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";

const UserOrders = () => {
  const dispatch = useAppDispatch();
  const { loading, error, orders, userInfo } = useAppSelector(
    (state) => state.user
  );
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, [userInfo, dispatch]);

  return userInfo ? (
    <>
      {loading ? (
        <Wrap
          justify="center"
          direction="column"
          align="center"
          mt="20px"
          minH="100vh"
        >
          <Stack direction="row" spacing={4}>
            <Spinner
              mt={20}
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer minHeight="100vh">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Order Date</Th>
                  <Th>Paid Total</Th>
                  <Th>Items</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td>
                      ${order.totalPrice} via {order.paymentMethod}
                    </Td>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList key={item._id}>
                          <ListItem>
                            {item.qty} x {item.name} (${item.price} ech)
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default UserOrders;
