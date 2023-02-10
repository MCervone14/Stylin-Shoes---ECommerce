import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface userObject {
  createdAt: Date;
  _id: string;
  email: string;
  password: string;
  name: string;
}

interface UserState {
  loading: boolean;
  error: null | string;
  userInfo: userObject | null;
  updateSuccess: boolean;
}

export const initialState: UserState = {
  loading: false,
  error: null,
  //@ts-ignore
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
  updateSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    userLogin: (state, action: PayloadAction<UserState["userInfo"]>) => {
      state.userInfo = action.payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state, action: PayloadAction<null>) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserProfile: (
      state,
      action: PayloadAction<UserState["userInfo"]>
    ) => {
      state.userInfo = action.payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
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
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
