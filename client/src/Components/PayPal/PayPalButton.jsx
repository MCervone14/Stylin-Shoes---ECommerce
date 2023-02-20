import { Box, Spinner, Stack } from "@chakra-ui/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect, useState } from "react";

const PayPalButton = ({
  total,
  onPaymentSuccess,
  onPaymentError,
  isDisabled,
}) => {
  const [paypalClient, setPayPalClient] = useState(null);

  useEffect(() => {
    const paypalKey = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      setPayPalClient(clientId);
    };
    paypalKey();
  }, [paypalClient]);

  return !paypalClient ? (
    <Stack direction="row" spacing={4} alignSelf="center">
      <Spinner
        mt={20}
        thickness="2px"
        speed="0.65s"
        emptyColor="gray.200"
        color="red.500"
        size="xl"
      />
    </Stack>
  ) : (
    <Box
      padding="5px"
      backgroundColor="white"
      borderRadius="5px"
      boxShadow={
        "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"
      }
    >
      <PayPalScriptProvider options={{ "client-id": paypalClient }}>
        <PayPalButtons
          disabled={isDisabled}
          forceReRender={[total(), paypalClient]}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total(),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              onPaymentSuccess(data);
            });
          }}
          onError={(err) => {
            onPaymentError(err);
          }}
        />
      </PayPalScriptProvider>
    </Box>
  );
};

export default PayPalButton;
