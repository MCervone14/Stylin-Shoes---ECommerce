import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./Slices/productsSlice";
import cartReducer from "./Slices/cartSlice";
import userReducer from "./Slices/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
