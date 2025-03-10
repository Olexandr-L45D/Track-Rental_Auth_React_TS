import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  UserRefreshToken,
  resetPassword,
  sendResetEmail,
  setAuthHeader,
  refreshSessionUser,
  confirmEmail,
  confirmOauth,
  getUser,
  getOauthUrl,
} from "./operations";
import { REHYDRATE } from "redux-persist/es/constants";
import { Action } from "@reduxjs/toolkit";
import { PersistedState } from "redux-persist"; // або ваш тип для збереженого стану
import { handleLogin, handleUserInfo } from "./handlers";
import { boolean } from "yup";

export interface AuthResponse {
  data: {
    accessToken: string;
    user: {
      name: string;
      email: string;
    };
  };
}

export interface User {
  id?: string; // id не обов'язковий
  name: string;
  email: string;
}

export interface AuthState {
  user?: User | null;
  token: string | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isError: boolean | string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isLoading: false,
};

type AuthStateRehydrate = {
  accessToken: string | null;
  user: { name: string; email: string } | null;
  isLoggedIn: boolean;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      console.log("🟢 LOGIN SUCCESS REDUCER TRIGGERED", action.payload);

      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.user = action.payload.user;

      // 🔹 Записуємо в LocalStorage
      localStorage.setItem("jwt-token", action.payload.accessToken);
      console.log("✅ Token set in Redux & LocalStorage:", state.accessToken);
    },
    setToken: (
      state,
      action: PayloadAction<{ accessToken: string; user?: User | null }>
    ) => {
      console.log("🔄 setToken action received:", action.payload);

      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true; // ✅ Встановлюємо isLoggedIn
        console.log(
          "✅ New accessToken - Token записаний у Redux:",
          state.accessToken
        );
        console.log("✅ isLoggedIn в setToken (falce/true):", state.isLoggedIn);
      } else {
        console.warn("⚠️ No accessToken provided in setToken!");
      }

      if (action.payload.user) {
        state.user = action.payload.user;
      } else {
        state.user = null;
      }
    },
    logOut: state => {
      state.accessToken = null;
      state.isLoggedIn = false; // ✅ Встановлюємо, що користувач НЕ залогінений
      state.user = null;
      localStorage.removeItem("jwt-token"); // ✅ Видаляємо токен з localStorage
    },
  },
  extraReducers: builder => {
    builder
      // **Адкейс Регістрація  .addCase(register.fulfilled, **
      .addCase(
        register.fulfilled,
        (
          state,
          action: PayloadAction<{ status: number; data: AuthResponse }>
        ) => {
          console.log("REGISTER SUCCESS:", action.payload);
          console.log(
            "🟢 Expected `accessToken`:",
            action.payload?.data?.data?.accessToken
          );

          state.user = {
            name: action.payload.data.data.user.name,
            email: action.payload.data.data.user.email,
          };

          const accessToken = action.payload?.data?.data?.accessToken;

          if (accessToken) {
            state.accessToken = action.payload.data.data.accessToken;
            localStorage.setItem(
              "jwt-token",
              action.payload.data.data.accessToken
            );

            // Встановлення заголовка для всіх наступних запитів
            setAuthHeader(action.payload.data.data.accessToken);
          } else {
            console.warn("⚠️ Register response does not contain accessToken!");
          }
          state.isLoggedIn = true;
          state.isLoading = false;
        }
      )

      // **Адкейс Логін .addCase(logIn.fulfilled, **

      .addCase(
        logIn.fulfilled,
        (
          state,
          action: PayloadAction<{ status: number; data: AuthResponse }>
        ) => {
          console.log("🟢 logIn.fulfilled TRIGGERED!");
          console.log("🔄 handleLogin TRIGGERED!");
          console.log("🔑 Payload отримано:", action.payload);
          console.log(
            "📌 Отримано токен:",
            action.payload?.data?.data?.accessToken
          );

          state.user = {
            name: action.payload.data.data.user.name,
            email: action.payload.data.data.user.email,
          };

          const newAccessToken = action.payload.data.data.accessToken ?? null;

          state.accessToken = newAccessToken;
          state.isLoading = false;
          state.isRefreshing = false;
          state.isLoggedIn = !!newAccessToken;

          console.log(
            "✅ Новий токен, який записуємо в Redux:",
            newAccessToken
          );

          if (newAccessToken) {
            console.log("📦 Зберігаємо цей самий токен у LocalStorage");
            localStorage.setItem("jwt-token", newAccessToken);
          }

          console.log("✅ state після handleLogin:", state);

          setAuthHeader(newAccessToken);

          console.log("✅ Token успішно записано в Redux:", state.accessToken);
          console.log("✅ isLoggedIn SET TO TRUE in Redux:", state.isLoggedIn);
          console.log("📌 New Redux State:", state); // ✅ Додали лог стану
        }
      )

      // **Адкейс Логаут .addCase(logOut.fulfilled, (вихід з додатка на поточній сторінці)**
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })

      // **Адкейс Рефреш .addCase(refreshUser. (заміна accessToken при потребі )**
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<UserRefreshToken>) => {
          console.log("🟢 REFRESH SUCCESS:", action.payload);

          state.user = {
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email,
          };

          if (action.payload.accessToken) {
            state.accessToken = action.payload.accessToken; // 🔥 Зберігаємо новий токен в Redux
            localStorage.setItem("jwt-token", action.payload.accessToken);
          } else {
            console.warn("⚠️ Refresh response does not contain accessToken!");
          }

          state.isRefreshing = false;
          state.isLoggedIn = true;
        }
      )

      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      // ** Адкейс .addCase(sendResetEmail.pending, - Відновлення пароля через надсилання листа**
      .addCase(sendResetEmail.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(sendResetEmail.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // ** Адкейс .addCase(resetPassword. Скидання пароля (заміна пароля через токен, отриманий з листом на пошту)**
      .addCase(resetPassword.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })
      // .addCase(confirmOauth.fulfilled, (state: AuthState, action: PayloadAction<{ status: number; data: AuthResponse }>) => {

      //   console.log("🔑 Payload отримано:", action.payload);
      //   console.log("📌 Отримано токен:", action.payload?.data?.data?.accessToken);

      //   state.user = {
      //     name: action.payload.data.data.user.name,
      //     email: action.payload.data.data.user.email,
      //   };

      //   state.accessToken = action.payload.data.data.accessToken;
      //   state.isLoggedIn = true;
      //   localStorage.setItem("jwt-token", action.payload.data.data.accessToken);
      //   setAuthHeader(action.payload.data.data.accessToken);
      // })
      .addCase(confirmOauth.fulfilled, handleLogin)
      .addCase(confirmEmail.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(getOauthUrl.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, handleUserInfo)
      .addCase(refreshSessionUser.pending, state => {
        state.isRefreshing = true;
      })

      .addCase(refreshSessionUser.fulfilled, (state, action) => {
        // state.accessToken = null;
        state.accessToken = action.payload.accessToken;
        // state.isError = action.payload as string;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })

      .addCase(refreshSessionUser.rejected, (state, action) => {
        state.accessToken = null;
        state.isError = action.payload as string;
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(REHYDRATE, (state, action: Action<"persist/REHYDRATE">) => {
        // Якщо payload існує, перевіряємо його тип і працюємо з ним
        if ((action as any).payload) {
          //  const payload = (action as any).payload as { auth: AuthStateRehydrate };
          const payload = (action as any).payload as {
            auth?: Record<string, any>;
          };
          state.accessToken = payload.auth?.accessToken ?? null;
          state.user = payload.auth?.user ?? null;
          // ЛОГ перед встановленням
          console.log("🔍 isLoggedIn у payload:", payload.auth?.isLoggedIn);

          state.isLoggedIn = JSON.parse(payload.auth?.isLoggedIn ?? "false");

          // ЛОГ після встановлення
          console.log("🟢 Updated state.isLoggedIn:", state.isLoggedIn);
          console.log("🔥 REHYDRATE payload:", payload);
          console.log("🟢 Updated state after REHYDRATE:", state);
        }
      })

      .addMatcher(
        isAnyOf(
          register.pending,
          logIn.pending,
          confirmEmail.pending,
          getOauthUrl.pending,
          confirmOauth.pending,
          getUser.pending
        ),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )

      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected,
          confirmEmail.rejected,
          getOauthUrl.rejected,
          confirmOauth.rejected,
          getUser.rejected
        ),
        (state, action: PayloadAction<unknown>) => {
          console.log("LOGIN ERROR:", action.payload); // ДОДАю ЛОГ щоб побачити чи коректно приходить помилка з unwrap()
          state.isLoading = false;
          state.isLoggedIn = false; // ОБОВ'ЯЗКОВО! Щоб коректно зчитувалося в селекторі
          state.isError =
            typeof action.payload === "string"
              ? action.payload
              : "Unknown error";
          // ❌ Видаляємо токен ТІЛЬКИ якщо логін або OAuth-авторизація не вдалася
          if (isAnyOf(logIn.rejected, confirmOauth.rejected)(action)) {
            localStorage.removeItem("jwt-token");
            setAuthHeader(null);
          }
        }
      );
  },
});

export const { loginSuccess, setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice.reducer;

// 📌 У вкладці Redux DevTools → Actions знайдіть logIn/fulfilled.

// 1️⃣ Відкрийте його та подивіться, чи є payload.data.data.accessToken.
// 2️⃣ Переконайтесь, що в state.auth змінюється isLoggedIn: true.

// ➡️ Якщо токен у payload є, але Redux не оновлює isLoggedIn, значить, проблема у persistReducer або setToken.

//  {
//           "key": "Content-Security-Policy",
//            "value": "default-src 'self'; img-src 'self' data: blob: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io;"
//         }
//  Замінив в пекейдж джейсон версію з "react-redux": "^9.2.0" на "react-redux": "^9.0.0"
