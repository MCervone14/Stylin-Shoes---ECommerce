import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface reviewObject {
  _id: string;
  name: string;
  title: string;
  comment: string;
  createdAt: string;
}

type reviews = reviewObject[];

interface productObject {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  qty: number;
  productIsNew: boolean;
  rating: number;
  description: string;
  numberOfReviews: number;
  reviews: reviews;
}

interface ProductState {
  loading: boolean;
  error: null | string;
  products: productObject[];
  product: productObject;
}

export const initialState: ProductState = {
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
    setProducts: (state, action: PayloadAction<ProductState["products"]>) => {
      state.products = action.payload;
      state.error = null;
      state.loading = false;
    },
    setProduct: (state, action: PayloadAction<ProductState["product"]>) => {
      state.loading = false;
      state.error = null;
      state.product = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, setProducts, setProduct } =
  productsSlice.actions;

export const productsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
