import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: {
    _id: "",
    name: "",
    image: "",
    price: 0,
    stock: 0,
    qty: 0,
    productIsNew: false,
    rating: 0,
    description: "",
    numberOfReviews: 0,
    reviews: [],
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.error = null;
      state.loading = false;
    },
    setProduct: (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, setProducts, setProduct } =
  productsSlice.actions;

export const productsSelector = (state) => state.products;

export default productsSlice.reducer;
