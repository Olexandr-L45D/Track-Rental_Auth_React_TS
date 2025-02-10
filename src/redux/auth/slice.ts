import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";

 interface UserData {
  id: string;
  name: string;
  email: string;
  token: string | null;
}

 interface AuthState {
  user: UserData | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isError: boolean | string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},  // Додаємо порожній об'єкт reducers - обовьязкове!
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action: PayloadAction<{ user: UserData; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.fulfilled, (state, action: PayloadAction<{ user: UserData; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); // Зберігаємо токен
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addMatcher(isAnyOf(register.pending, logIn.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(register.rejected, logIn.rejected), (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.isError = typeof action.payload === "string" ? action.payload : "Unknown error";
      });
  },
});


export const authReducer = authSlice.reducer;
export default authSlice.reducer;


// .addCase(logIn.fulfilled, (state, action) => {
//   state.user = action.payload;
//   state.isLoggedIn = true;
//   localStorage.setItem('token', action.payload.token); // Зберігаємо токен
// })