// auth - autorizations
import axios from 'axios';
import { axiosInstanceUser } from '../../axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../hooks/notifications';
import {RootState} from '../store'


export const setAuthHeader = (accessToken: string | null) => {
  console.log("🔎 Checking accessToken in setAuthHeader:", accessToken);
  
  if (!accessToken) {
    console.warn("⚠️ No access token provided. Authorization header NOT set.");
    return;
  }

  axiosInstanceUser.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  console.log("✅ AUTH HEADER SET:", axiosInstanceUser.defaults.headers.common.Authorization);
};

// Utility to remove JWT - token
const clearAuthHeader = () => {
  delete axiosInstanceUser.defaults.headers.common["Authorization"];
};

export interface UserDataRes {
  name: string;
  email: string;
};
// Тип для даних логіну
interface AuthCredentials {
    email: string;
    password: string;
};

export interface AuthResponse {
data : {
  accessToken: string;
  user: {
    name: string;
    email: string;
  };}

}
// export interface AuthResponse {
//   accessToken: string;
//   user: {
//     name: string;
//     email: string;
//   };
// }
// взяв сюда для наглядності UsRegisterVelues (пізніше імпортую з форми регістрації і приберу)
export interface UsRegisterVelues {
    name: string;
    email: string;
    password: string;
  }
  
/*
 * POST @ /auth/register
 * body: { email, password } = userInfo
 */
// ThunkAPIConfig: Типізація для thunkAPI.Ми використовуємо { state: RootState }, щоб мати доступ до типізованого Redux стану.
export const register = createAsyncThunk<
 { status: number; data: AuthResponse }, // Оновлено тип повернення   
    UsRegisterVelues,               // Тип аргументів, які передаються у функцію
    { rejectValue: string; state: RootState }  // Доступ до Redux стану та Тип помилки, що повертається у випадку невдачі
  >('auth/register',
  async (userDataValues, thunkAPI) => {
    try {
      const response = await axiosInstanceUser.post<AuthResponse>('/auth/register', userDataValues, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      // After successful registration, add the token to the HTTP header
    notifySuccess('You Registers Succesfull !');

      console.log("REGISTER RESPONSE:", response.data); // Додати це для перевірки чи приходе токен?
      setAuthHeader(response.data.data.accessToken);
      localStorage.setItem("token", response.data.data.accessToken);
      
       return { status: response.status, data: response.data }; // Оновлено повернення
          // return response.data;
        } catch (error: any) {
  const errorMessage = error.response?.data?.message || 'Error register!';
  // більше деталей про помилку в вітповіді з сервера в errorMessage
  return thunkAPI.rejectWithValue(errorMessage);
}
    }
);

/**
 * Get User Info
 * Just update local info about user
 * Not sure if it is needed at all
 */
export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    const response = await axiosInstanceUser.get('/users');
    notifySuccess('You get on User Succesfull');
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.data?.message)
      return thunkAPI.rejectWithValue(error.response.data.data.message);
  const errorMessage = error.response?.data?.message || 'Error get All User!';
  // більше деталей про помилку в вітповіді з сервера в errorMessage
  return thunkAPI.rejectWithValue(errorMessage);
  }
});

/*
 * POST @ /auth/login
 * body: { email, password } = userInfo
 */

export const logIn = createAsyncThunk<
   { status: number; data: AuthResponse }, // ✅ Оновлено тип повернення                  
    AuthCredentials,               
    { rejectValue: string }        
>( "auth/login", async (userInfo, thunkAPI) => {
    try {
        const response = await axiosInstanceUser.post<AuthResponse>("/auth/login", userInfo);
        
        console.log("🔍 API LOGIN RESPONSE:", response.data); 
        console.log("🔍 API LOGIN TOKEN:", response.data?.data?.accessToken);

        if (!response.data || !response.data.data.accessToken) {
            console.error("❌ API response does not contain accessToken!");
            return thunkAPI.rejectWithValue("No accessToken in response");
        }

        // ✅ Додаємо токен у заголовки Axios
        setAuthHeader(response.data.data.accessToken);

        // ✅ Зберігаємо токен у localStorage
        localStorage.setItem("jwt-token", response.data.data.accessToken);
        notifySuccess('You Login Succesfull');
        return { status: response.status, data: response.data }; // ✅ Оновлено повернення

    } catch (error: any) {
        console.error("❌ LOGIN ERROR:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue("Error during login!");
    }
});


// export const logIn = createAsyncThunk<
//    { status: number; data: AuthResponse }, // Оновлено тип повернення                 
//     AuthCredentials,               
//     { rejectValue: string }        
// >( 'auth/login',   async (userInfo, thunkAPI) => {
//         try {
//             const response = await axiosInstanceUser.post<AuthResponse>('/auth/login', userInfo);
//           // After successful login, add the token to the HTTP header
//           console.log("🔍 API LOGIN RESPONSE:", response.data); // ✅ Перевіряємо, що повертає бекенд
//           console.log("🔍 API LOGIN RESPONSE:", response.data.data.accessToken); // ✅ Перевіряємо, що повертає бекенд
//             setAuthHeader(response.data.data.accessToken);

//             // Збереження токену в localStorage
//             localStorage.setItem('token', response.data.data.accessToken);
//            if (!response.data || !response.data.data.accessToken) {
//         console.error("❌ API response does not contain accessToken!");
//         return thunkAPI.rejectWithValue("No accessToken in response");
//       }
          
//             return { status: response.status, data: response.data }; // Оновлено повернення
//         } catch (error) {
//             return thunkAPI.rejectWithValue("Error during login!");
//         }
//     }
// );

/*
 * POST @ /auth/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk<
    void,                          // Нічого не повертається після логауту
    void,                          // Немає аргументів
    { rejectValue: string }        // Тип помилки
>('auth/logout', async (_, thunkAPI) => {
    try {
      await axiosInstanceUser.post('/auth/logout');
       notifySuccess('You Logout Succesfull');
        // After a successful logout, remove the token from the HTTP header
      clearAuthHeader();
      localStorage.removeItem('token');  // Видалення токену з localStorage
    } catch (error) {
        return thunkAPI.rejectWithValue('Error logOut !');
    }
});


export interface UserRefreshToken {
  id: string;
  name: string;
  email: string;
  accessToken: string | null; // Токен може приходити в деяких випадках
}


// функція відправки листа на пошту для авторизації (використовую власний бекенд)
interface ResetEmailResponse {
  email: string;
}

export const sendResetEmail = createAsyncThunk<ResetEmailResponse, string>(
  "auth/sendResetEmail",
  // 'user/sendResetEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceUser.post("/auth/send-reset-email", { email });
      notifySuccess('Send Reset Email on you email Succesfull');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error sending email");
    }
  }
);

/**
 * Send Reset Password Email
 * User gets link to the Password Reset page with reset token
 */
// export const sendResetPasswordEmail = createAsyncThunk(
//   'user/send-reset-email',
//   async (email, thunkAPI) => {
//     try {
//       const { data } = await authAPI.post('/auth/send-reset-email', email);
//       notifySuccess('Password reset email sent');
//       return data;
//     } catch (error) {
//       if (error.response?.data?.data?.message)
//         return thunkAPI.rejectWithValue(error.response.data.data.message);
//       notifyError('Password reset email was not sent');
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

// функція ресет пароля для сміни пароля та утентифікації (використовую власний бекенд)
export const resetPassword = createAsyncThunk<
  { message: string }, // Очікуваний формат відповіді
  { newPassword: string; token: string }, // Вхідні параметри
  { rejectValue: string } // Помилка
>(
  "auth/resetPassword",
  // 'user/reset-pwd',
  async ({ newPassword, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceUser.post("/auth/reset-pwd", { newPassword, token });
      notifySuccess('Reset on you password Succesfull');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error resetting password");
    }
  }
);


export const refreshUser = createAsyncThunk<
  UserRefreshToken, void, { state: RootState; rejectValue: string }>(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
   
    try {
      const accessToken = getState().auth.accessToken;
    console.log("🔍 REFRESH TOKEN BEFORE REQUEST:", accessToken); // ✅ Додано лог
    if (!accessToken) {
      return rejectWithValue("No access token found");
    }
      setAuthHeader(accessToken);
      notifySuccess('Refresh of token Succesfull');
      const response = await axiosInstanceUser.get<UserRefreshToken>("/auth/refresh");

      console.log("🟢 User data from refresh:", response.data);

      // Оновлюємо локальне сховище
      localStorage.setItem("jwt-token", response.data.accessToken || "");

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error("❌ Unauthorized, logging out...");
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue("Error refreshing user");
    }
  }
);

/**
 * Confirm Email
 * User is now active and can log in with his password
 */
interface ConfirmEmailPayload {
  accessToken: string | null; 
}

export const confirmEmail = createAsyncThunk<
  ConfirmEmailPayload,  // ✅ Правильний тип повернення
  { token: string }      // ✅ Очікуємо об'єкт з `token`
>(
  'user/confirm-email',
  async ({ token }, thunkAPI) => {
    try {
      const response = await axiosInstanceUser.post('/auth/confirm-email', { token });
      console.log(response);
      setAuthHeader(response.data.data.accessToken);
      notifySuccess('Email confirmed');
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      const errorMessage = error.response?.data?.message || 'Email has not been confirmed';
  // більше деталей про помилку в вітповіді з сервера в errorMessage
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

/**
 * Google auth: get OAuth URL
 */
export const getOauthUrl = createAsyncThunk(
  'user/get-oauth-url',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstanceUser.get('/auth/get-oauth-url');
      return data;
    } catch (error: any) {
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      notifyError('Oauth url failed');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * Refresh Session = refreshUser
 * User gets new accessToken
 */

export interface UserRefreshSessionToken {
  accessToken: string | null; // Токен може приходити в деяких випадках
}

export const refreshSessionUser = createAsyncThunk<
  UserRefreshSessionToken, // 🔹 Можеш замінити на точний тип даних, який повертає API
  void,
  { state: RootState; rejectValue: string } // 🔹 Додаємо правильний тип для `getState()`
  >(
  'user/refresh-session',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstanceUser.post<UserRefreshSessionToken>('/auth/refresh');
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState() as RootState; // 🔹 Вказуємо RootState
      return reduxState.auth.accessToken !== null;
    },
  },
);

/**
 * Google auth: confirm user and get authToken
 */
export const confirmOauth = createAsyncThunk<
  UserRefreshSessionToken, 
  string,
  { state: RootState; rejectValue: string }
  >(
  'user/confirm-oauth',
  async (code, thunkAPI) => {
    try {
      const response = await axiosInstanceUser.post<UserRefreshSessionToken>('/auth/confirm-oauth', {code});
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.data.message);
      const errorMessage = error.response?.data?.message || 'Oauth confirm failed';
  
      // більше деталей про помилку в вітповіді з сервера в errorMessage
     notifyError('confirmOauth url Error failed');
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

