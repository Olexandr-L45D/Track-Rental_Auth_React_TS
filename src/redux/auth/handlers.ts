import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./slice";
import { setAuthHeader, UserRefreshSessionToken } from "./operations";


export const handleUserInfo = (state: AuthState, { payload }: PayloadAction<{ auth?: { user?: User } }>) => {
  state.user = payload.auth?.user ?? null;
  state.isLoading = false;
};

export const handleLogin = (state: AuthState, action: PayloadAction<
  UserRefreshSessionToken>) => {
  console.log("🔄 handleLogin-Google TRIGGERED!");
  console.log("🔑 Payload отримано:", action.payload);
  const newAccessToken = action.payload.accessToken ?? null;

  state.accessToken = newAccessToken;
  state.isLoading = false;
  state.isRefreshing = false;
  state.isLoggedIn = !!newAccessToken;

  console.log("✅ Новий токен, який записуємо в Redux:", newAccessToken);

  if (newAccessToken) {
    console.log("📦 Зберігаємо цей самий токен у LocalStorage");
    localStorage.setItem("jwt-token", newAccessToken);
  }

  console.log("✅ state після handleLogin:", state);

  setAuthHeader(newAccessToken);
  
};


