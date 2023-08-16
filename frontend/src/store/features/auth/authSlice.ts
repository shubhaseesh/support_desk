import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import authService from "./authService";
interface FormData {
  name: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}
interface User {
  email: string;
  name: string;
  _id: string;
  token: string;
}
const getUserFromLocalStorage = (): User => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

export interface InitialState {
  user: User | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: InitialState = {
  user: getUserFromLocalStorage(),
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user: FormData, thunkAPI: any) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// User login
export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginData, thunkAPI: any) => {
    try {
      return await authService.login(loginData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    authService.logout();
  } catch (error: unknown) {
    console.error(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
