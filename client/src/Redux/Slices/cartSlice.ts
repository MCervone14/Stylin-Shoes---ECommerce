import { createSlice, nanoid } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface cartObject {
  id: string;
  name?: string;
  image?: string;
  price: number;
  stock: number;
  qty: number;
}
type cart = cartObject[];

interface CartState {
  id: string;
  loading: boolean;
  error: null | string;
  cart: cart;
  expressShipping: boolean;
  subtotal: number | string;
}

const calculateSubtotal = (cartState: cart) => {
  let result = 0;
  cartState.map((item: any) => (result += item.qty * item.price));
  return Number(result).toFixed(2);
};

export const initialState: CartState = {
  id: nanoid.toString(),
  loading: false,
  error: null,
  //@ts-ignore
  cart: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  expressShipping: false,
  subtotal: localStorage.getItem("subtotal")
    ? //@ts-ignore
      calculateSubtotal(JSON.parse(localStorage.getItem("cartItems")))
    : 0,
};

const updateLocalStorage = (cart: any) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  //@ts-ignore
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(cart)));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    cartItemAdd: (state, action: PayloadAction<cartObject>) => {
      if (!state.cart) return;
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === existingItem.id ? action.payload : item
        );
      } else {
        state.cart = [...state.cart, action.payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    cartItemRemoval: (state, action: PayloadAction<string>) => {
      state.cart = [...state.cart].filter((item) => item.id !== action.payload);
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, cartItemAdd, cartItemRemoval } =
  cartSlice.actions;

export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
