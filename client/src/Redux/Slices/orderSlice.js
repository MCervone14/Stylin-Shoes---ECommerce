import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: true,
  shippingAddress: null,
  orderInfo: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    shippingAddressAdd: (state, action) => {
      state.shippingAddress = action.payload;
      state.loading = false;
    },
    clearOrder: (state) => {
      state = initialState;
    },
  },
});

export const { setError, setLoading, shippingAddressAdd, clearOrder } =
  orderSlice.actions;

export const orderSelector = (state) => state.order;

export default orderSlice.reducer;
