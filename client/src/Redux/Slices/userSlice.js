import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
  updateSuccess: false,
  orders: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    userLogin: (state, action) => {
      state.userInfo = action.payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserProfile: (state, action) => {
      state.userInfo = action.payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    setUserOrders: (state, action) => {
      state.error = null;
      state.orders = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setError,
  setLoading,
  userLogin,
  userLogout,
  resetUpdate,
  updateUserProfile,
  setUserOrders,
} = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;
