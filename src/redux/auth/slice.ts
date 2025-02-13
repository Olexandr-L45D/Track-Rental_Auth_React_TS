import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser, UserRefreshToken, AuthResponse } from "./operations";
// import { UserData } from "../../components/App/App.types";

//  interface AuthState {
//   user: UserData | null;
//   token: string | null;
//   isLoggedIn: boolean;
//   isRefreshing: boolean;
//   isError: boolean | string;
//   isLoading: boolean;
// }
export interface User {
  id?: string; // id не обов'язковий
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isError: boolean | string;
  isLoading: boolean;
}

// export interface AuthState {
//   user: { name: string; email: string } | null;
//   token: string | null;
//   isLoggedIn: boolean;
//   isRefreshing: boolean;
//   isError: boolean | string;
//   isLoading: boolean;
// }

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
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        console.log("REGISTER SUCCESS:", action.payload); // Додаємо лог
        // state.user = action.payload.user;
        state.user = {
    // id: action.payload.user.id ?? "", // Якщо id немає, ставимо пустий рядок
    name: action.payload.user.name,
    email: action.payload.user.email,
  };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        // state.user = action.payload.user;
        state.user = {
    // id: action.payload.user.id ?? "", // Якщо id немає, ставимо пустий рядок
    name: action.payload.user.name,
    email: action.payload.user.email,
  };
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); // Зберігаємо токен
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<UserRefreshToken>) => {
  state.user = {
    id: action.payload.id,
    name: action.payload.name,
    email: action.payload.email,
  };
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



// версія не явним обєктом а просто:
 // .addCase(refreshUser.fulfilled, (state, action: PayloadAction<UserRefreshToken>) => {
      //   state.user = action.payload;
      //   state.token = action.payload.token;
      //   state.isRefreshing = false;
      //   state.isLoggedIn = true;
      // })