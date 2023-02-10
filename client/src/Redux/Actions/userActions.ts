import axios from "axios";
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
} from "../Slices/userSlice";

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(setLoading());
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      dispatch(userLogin(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An unexpected error has occurred. Please try again later."
        )
      );
    }
  };

export const logout = () => (dispatch: any) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout(null));
};

export const register =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    dispatch(setLoading());
    try {
      console.log("I'm in register");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password },
        config
      );
      dispatch(userLogin(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An unexpected error has occurred. Please try again later."
        )
      );
    }
  };
