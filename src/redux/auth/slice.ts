import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser, UserRefreshToken, AuthResponse, resetPassword, sendResetEmail } from "./operations";

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
   reducers: {
    loginSuccess: (state: AuthState, action: PayloadAction<{ token: string; user: User }>) => { 
      console.log("🟢 LOGIN SUCCESS REDUCER TRIGGERED", action.payload);
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
  },// Додаємо порожній об'єкт reducers - обовьязкове!
  extraReducers: (builder) => {
    builder
        .addCase(register.fulfilled, (state, action: PayloadAction<{ status: number; data: AuthResponse }>) => {
  console.log("REGISTER SUCCESS:", action.payload);
  console.log("TOKEN RECEIVED:", action.payload.data.token);

  state.user = {
    name: action.payload.data.user.name,
    email: action.payload.data.user.email,
  };
  state.token = action.payload.data.token;
  localStorage.setItem('token', action.payload.data.token);
  state.isLoggedIn = true;
  state.isLoading = false;
})
.addCase(logIn.fulfilled, (state, action: PayloadAction<{ status: number; data: AuthResponse }>) => {
  console.log("LOGIN SUCCESS:", action.payload);
  console.log("TOKEN RECEIVED:", action.payload.data.token);

  state.user = {
    name: action.payload.data.user.name,
    email: action.payload.data.user.email,
  };
  state.token = action.payload.data.token;
  localStorage.setItem('token', action.payload.data.token);

  state.isLoggedIn = true;
  state.isLoading = false;
})
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<UserRefreshToken>) => {
  console.log("REFRESH SUCCESS:", action.payload);
  state.user = {
    id: action.payload.id,
    name: action.payload.name,
    email: action.payload.email,
        };

    //     if (!action.payload.data.token) {
    // console.warn("Token not received, attempting to log in...");
    // await dispatch(logIn({ email: action.payload.data.user.email, password: userDataValues.password }));
    // return;
    //    }
  state.token = action.payload.token; // Оновлюємо тільки якщо він змінився
  localStorage.setItem("token", action.payload.token || "");
  state.isRefreshing = false;
  state.isLoggedIn = true;
})
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      // **Відновлення пароля (надсилання листа)**
      .addCase(sendResetEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // **Скидання пароля (зміна пароля через токен)**
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })
      .addMatcher(isAnyOf(register.pending, logIn.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(register.rejected, logIn.rejected), (state, action: PayloadAction<unknown>) => {
        console.log("LOGIN ERROR:", action.payload); // ДОДАю ЛОГ щоб побачити чи чи коректно приходить помилка з unwrap()
        state.isLoading = false;
         state.isLoggedIn = false; // ОБОВ'ЯЗКОВО! Щоб коректно зчитувалося в селекторі
        state.isError = typeof action.payload === "string" ? action.payload : "Unknown error";
      });
  },
});

export const { loginSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice.reducer;


// Оскільки у файлі axiosInstance.ts ти імпортуєш store, а у store.ts 
// ймовірно імпортується authSlice.ts, де використовується register, це може призводити до проблеми.
// Цикл виглядає так:
// store.ts імпортує authSlice.ts
// authSlice.ts імпортує operations.ts
// operations.ts імпортує axiosInstance.ts
// axiosInstance.ts імпортує store.ts → циклічний імпорт!
// Це може спричинити помилку, коли register ще не ініціалізований.