import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface userObject {
  email: string;
  password: string;
  name: string;
}

interface UserState {
  loading: boolean;
  error: null | string;
  userInfo: userObject | null;
}

export const initialState: UserState = {
  loading: false,
  error: null,
  //@ts-ignore
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    userLogin: (state, action: PayloadAction<userObject>) => {
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
  },
});

export const { setError, setLoading, userLogin, userLogout } =
  userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
