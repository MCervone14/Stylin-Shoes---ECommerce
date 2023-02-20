import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (cartState) => {
  let result = 0;
  cartState.map((item) => (result += item.qty * item.price));
  return Number(result).toFixed(2);
};

export const initialState = {
  id: "",
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  expressShipping: JSON.parse(localStorage.getItem("cartItems")) ?? false,
  subtotal: localStorage.getItem("subtotal")
    ? calculateSubtotal(JSON.parse(localStorage.getItem("cartItems")))
    : 0,
};

const updateLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(cart)));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    cartItemAdd: (state, action) => {
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
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    cartItemRemoval: (state, action) => {
      state.cart = [...state.cart].filter((item) => item.id !== action.payload);
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
      state.loading = false;
      state.error = null;
    },
    setExpressShipping: (state, action) => {
      state.expressShipping = action.payload;
      localStorage.setItem("expressShipping", action.payload.toString());
    },
    clearCart: (state) => {
      localStorage.removeItem("cartItems");
      state.cart = [];
    },
  },
});

export const {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemoval,
  setExpressShipping,
  clearCart,
} = cartSlice.actions;

export const cartSelector = (state) => state.cart;

export default cartSlice.reducer;
