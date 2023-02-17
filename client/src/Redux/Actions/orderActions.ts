import axios from "axios";
import { setError, shippingAddressAdd, clearOrder } from "../Slices/orderSlice";

export const setShippingAddress = (data: any) => (dispatch: any) => {
  dispatch(shippingAddressAdd(data));
};

export const setShippingAddressError = (value: any) => (dispatch: any) => {
  dispatch(setError(value));
};

export const createOrder =
  (order: any) => async (dispatch: any, getState: any) => {
    const {
      order: { shippingAddress },
      user: { userInfo },
    } = getState();

    const preparedOrder = { ...order, shippingAddress };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.post("api/orders", preparedOrder, config);
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An unexpected error has occurred. Please try again later."
        )
      );
    }
  };

export const resetOrder = () => async (dispatch: any) => {
  dispatch(clearOrder());
};
