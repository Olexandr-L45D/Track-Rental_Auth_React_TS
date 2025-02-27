import { PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, AuthState, User } from "./slice";


export const handleUserInfo = (state: AuthState, { payload }: PayloadAction<{ auth?: { user?: User } }>) => {
  state.user = payload.auth?.user ?? null;
  state.isLoading = false;
};

export const handleLogin = (state: AuthState, action: PayloadAction<{ status: number; data: AuthResponse }>) => {
  state.accessToken = action.payload.data.data.accessToken ?? null;
  state.isLoading = false;
  state.isRefreshing = false;
  state.isLoggedIn = true;
};

   