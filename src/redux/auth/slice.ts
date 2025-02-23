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
    setToken: (state, action: PayloadAction<{ accessToken: string; user?: User | null }>) => {
  console.log("🔄 setToken action received:", action.payload);
  
  if (action.payload.accessToken) {
    state.accessToken = action.payload.accessToken;
    state.isLoggedIn = true; // ✅ Встановлюємо isLoggedIn
    console.log("✅ New accessToken in Redux state:", state.accessToken);
    console.log("✅ isLoggedIn SET TO TRUE in Redux");
  } else {
    console.warn("⚠️ No accessToken provided in setToken!");
  }

  if (action.payload.user) {
    state.user = action.payload.user;
  } else {
    state.user = null;
  }
},

    // setToken: (state: AuthState, action: PayloadAction<{ accessToken: string; user?: User | null }>) => {
      
    //   state.isLoggedIn = !!action.payload.accessToken;
    //   console.log("🔄 setToken action received:", action.payload);
    //   state.accessToken = action.payload.accessToken;
    //   console.log("✅ New accessToken in Redux state:", state.accessToken);
    //   if (action.payload.user) {
    //     state.user = action.payload.user;
    //   } else {
    // state.user = null; //  Очищуємо юзера, якщо немає
    // }
      
    // },
    logOut: (state) => {
  state.accessToken = null;
  state.isLoggedIn = false;  // ✅ Встановлюємо, що користувач НЕ залогінений
  state.user = null; 
  localStorage.removeItem("jwt-token"); // ✅ Видаляємо токен з localStorage
   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action: PayloadAction<{ status: number; data: AuthResponse }>) => {
        console.log("REGISTER SUCCESS:", action.payload);
     console.log("🟢 Expected `accessToken`:", action.payload?.data?.data?.accessToken);
     
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
    state.isLoggedIn = true;  // ✅ Має стати true!
    localStorage.setItem("jwt-token", action.payload.data.data.accessToken);
    setAuthHeader(action.payload.data.data.accessToken);
  } else {
    console.warn("❌ No accessToken in payload!");
    return;
  }

        state.isLoggedIn = true;
        state.isLoading = false;
      })
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

