import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser, UserRefreshToken,  resetPassword, sendResetEmail, setAuthHeader } from "./operations";

export interface AuthResponse {
  data: {
  accessToken: string;
  user: {
    name: string;
    email: string;
  };}
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


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: AuthState, action: PayloadAction<{ accessToken: string; user: User }>) => {
      console.log("🟢 LOGIN SUCCESS REDUCER TRIGGERED", action.payload);

      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.user = action.payload.user;

      // 🔹 Записуємо в LocalStorage
      localStorage.setItem("jwt-token", action.payload.accessToken);
      console.log("✅ Token set in Redux & LocalStorage:", state.accessToken);
    },
    setToken: (state: AuthState, action: PayloadAction<{ accessToken: string; user?: User | null }>) => {
      
      state.isLoggedIn = !!action.payload;
      console.log("🔄 setToken action received:", action.payload);
      state.accessToken = action.payload.accessToken;
      console.log("✅ New accessToken in Redux state:", state.accessToken);
      if (action.payload.user) {
        state.user = action.payload.user;
      } else {
    state.user = null; //  Очищуємо юзера, якщо немає
    }
      
    },
    logOut: (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("jwt-token"); // Видаляємо токен при виході
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action: PayloadAction<{ status: number; data: AuthResponse }>) => {
        console.log("REGISTER SUCCESS:", action.payload);
        // console.log("TOKEN RECEIVED:", action.payload.data.data.accessToken);
console.log("🟢 Expected `accessToken`:", action.payload?.data?.data?.accessToken);
// const { accessToken } = action.payload.data.data;

        state.user = {
          name: action.payload.data.data.user.name,
          email: action.payload.data.data.user.email,
        };

    const accessToken = action.payload?.data?.data?.accessToken;

  if (accessToken) {
    state.accessToken = action.payload.data.data.accessToken;
    localStorage.setItem("jwt-token", action.payload.data.data.accessToken);

    // Встановлення заголовка для всіх наступних запитів
    setAuthHeader(action.payload.data.data.accessToken);
  } else {
    console.warn("⚠️ Register response does not contain accessToken!");
  }
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.fulfilled, (state, action: PayloadAction<{ status: number; data: AuthResponse }>) => {
           console.log("TOKEN RECEIVED.Data:", action.payload.data?.data?.accessToken);

        state.user = {
          name: action.payload.data.data.user.name,
          email: action.payload.data.data.user.email,
        };

         console.log("🔄 LOG IN SUCCESS: Action payload received", action.payload);
    
    const receivedToken = action.payload.data?.data?.accessToken;
    console.log("📥 Received accessToken:", receivedToken);
    
    if (receivedToken) {
        state.accessToken = receivedToken;
        console.log("✅ Token successfully saved to Redux:", state.accessToken);
    } else {
        console.warn("⚠️ No accessToken in response!");
    }

  if (action.payload.data?.data?.accessToken) {
    state.accessToken = action.payload.data.data.accessToken;
    localStorage.setItem("jwt-token", action.payload.data.data.accessToken);
    setAuthHeader(action.payload.data.data.accessToken);
  } else {
    console.warn("❌ No accessToken in payload!");
    return;
  }

        state.isLoggedIn = true;
        state.isLoading = false;
      })

      // Новий приклад з accessToken; замість token - скрізь міняю!!!
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
        .addCase(refreshUser.fulfilled, (state, action: PayloadAction<UserRefreshToken>) => {
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

export const { loginSuccess, setToken } = authSlice.actions;
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


// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//    reducers: {
//     loginSuccess: (state: AuthState, action: PayloadAction<{ accessToken: string; user: User }>) => {
//       console.log("🟢 LOGIN SUCCESS REDUCER TRIGGERED", action.payload);
//       // state.token = action.payload.token;
//        // state.isLoggedIn = true;
//        state.accessToken = action.payload.accessToken;
//       state.isLoggedIn = true;
    
//        state.user = action.payload.user;
//        // 🔹 Збереження в LocalStorage
//   localStorage.setItem("jwt-token", action.payload.accessToken);

//   console.log("✅ Token set in Redux & LocalStorage:", state.accessToken);
//      },
//      setToken: (state, action: PayloadAction<string | null>) => {
//       state.accessToken = action.payload;
//       state.isLoggedIn = !!action.payload; // Якщо токен є → isLoggedIn = true
//     },
//     logOut: (state) => {
//       state.accessToken = null;
//       state.isLoggedIn = false;
//       localStorage.removeItem("jwt-token"); // При виході видаляємо токен
//     },
//   },// Додаємо порожній об'єкт reducers - обовьязкове!
//   extraReducers: (builder) => {
//     builder
//         .addCase(register.fulfilled, (state, action: PayloadAction<{ status: number; data: AuthResponse }>) => {
//   console.log("REGISTER SUCCESS:", action.payload);
//   console.log("TOKEN RECEIVED:", action.payload.data.accessToken);

//   state.user = {
//     name: action.payload.data.user.name,
//     email: action.payload.data.user.email,
//           };
//           console.log("✅ REGISTER TOKEN RECEIVED:", action.payload.data.accessToken);

// if (action.payload.data.accessToken) {
//   state.token = action.payload.data.accessToken;
//   localStorage.setItem('token', action.payload.data.accessToken);
//   localStorage.setItem("jwt-token", "accessToken");
//   // 🔥 Важливо! Викликаємо setAuthHeader одразу після збереження
//   setAuthHeader(action.payload.data.accessToken);
//   console.log(localStorage.getItem("jwt-token"))
// } else {
//   console.warn("⚠️ Register response does not contain accessToken!");
// }

//   // state.token = action.payload.data.accessToken;
//   // localStorage.setItem('token', action.payload.data.accessToken);
//   state.isLoggedIn = true;
//   state.isLoading = false;
// })
// .addCase(logIn.fulfilled, (state, action: PayloadAction<{ status: number; data: AuthResponse }>) => {
//   console.log("LOGIN SUCCESS:", action.payload);
//   console.log("TOKEN RECEIVED:", action.payload.data.accessToken);

//   state.user = {
//     name: action.payload.data.user.name,
//     email: action.payload.data.user.email,
//   };
//   if (!action.payload.data.accessToken) {
//     console.error("❌ No accessToken in payload!");
//     return;
//   }
  
//   state.token = action.payload.data.accessToken;
//   localStorage.setItem('token', action.payload.data.accessToken);
//   localStorage.setItem("jwt-token", "accessToken");
//   console.log(localStorage.getItem("jwt-token"))
//   state.isLoggedIn = true;
//   state.isLoading = false;
// })

// console.log("🔍 LocalStorage JWT:", localStorage.getItem("jwt-token"));
// console.log("🔍 LocalStorage token:", localStorage.getItem("token"));
// console.log("🔍 accessToken:", localStorage.getItem("accessToken"));

