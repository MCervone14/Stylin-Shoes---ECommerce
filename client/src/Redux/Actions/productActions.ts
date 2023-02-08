import axios from "axios";

import {
  setProducts,
  setLoading,
  setError,
  setProduct,
} from "../Slices/productsSlice";

export const getProducts = () => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get("/api/products");
    dispatch(setProducts(data));
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

export const getProduct = (id: string) => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
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
