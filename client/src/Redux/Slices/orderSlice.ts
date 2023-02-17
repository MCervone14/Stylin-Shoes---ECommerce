import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface orderObject {
  createdAt: Date;
  _id: string;
  email: string;
  password: string;
  name: string;
}

interface OrderState {
  loading: boolean;
  error: null | boolean;
  shippingAddress: null | string;
  orderInfo: null | orderObject;
}

export const initialState: OrderState = {
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
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    shippingAddressAdd: (state, action: PayloadAction<string>) => {
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

export const orderSelector = (state: RootState) => state.order;

export default orderSlice.reducer;
