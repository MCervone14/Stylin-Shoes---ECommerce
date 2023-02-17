import axios from "axios";
import {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemoval,
  setExpressShipping,
  clearCart,
} from "../Slices/cartSlice";

export const addCartItem =
  (id: string, qty: number) => async (dispatch: any) => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      const itemToAdd = {
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        stock: data.stock,
        qty,
      };
      dispatch(cartItemAdd(itemToAdd));
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

export const removeCartItem = (id: string) => async (dispatch: any) => {
  dispatch(setLoading());
  dispatch(cartItemRemoval(id));
};

export const setExpress = (value: any) => async (dispatch: any) => {
  dispatch(setExpressShipping(value));
};

export const resetCart = () => (dispatch: any) => {
  dispatch(clearCart(null));
};
