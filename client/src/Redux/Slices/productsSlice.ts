import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ProductState {
  loading: boolean;
  error: null | string;
  products: [];
}

export const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, setProducts } = productsSlice.actions;

export const productsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
