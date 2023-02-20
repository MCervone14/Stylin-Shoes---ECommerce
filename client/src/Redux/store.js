import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./Slices/productsSlice";
import cartReducer from "./Slices/cartSlice";
import userReducer from "./Slices/userSlice";
import orderReducer from "./Slices/orderSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});
