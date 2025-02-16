// auth - autorizations
import axios from 'axios';
import { axiosInstanceUser } from '../../axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {RootState} from '../store'


// Utility to add JWT - (token)
const setAuthHeader = (token: string | null) => {
    axiosInstanceUser.defaults.headers.common.Authorization = `Bearer ${token}`;
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
  token: string;
  user: {
    // id?: string; // id може бути відсутнім
    name: string;
    email: string;
  };
}
// взяв сюда для наглядності UsRegisterVelues (пізніше імпортую з форми регістрації і приберу)
export interface UsRegisterVelues {
    name: string;
    email: string;
    password: string;
  }
  
// POST @/users/signup
// ThunkAPIConfig: Типізація для thunkAPI.Ми використовуємо { state: RootState }, щоб мати доступ до типізованого Redux стану.
export const register = createAsyncThunk<
    AuthResponse,                  // Тип даних, які повертаються після успішної реєстрації
    UsRegisterVelues,               // Тип аргументів, які передаються у функцію
    { rejectValue: string; state: RootState }  // Доступ до Redux стану та Тип помилки, що повертається у випадку невдачі
  >('auth/register',
  async (userDataValues, thunkAPI) => {
    try {
      const response = await axiosInstanceUser.post<AuthResponse>('/users/signup', userDataValues, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
            // After successful registration, add the token to the HTTP header
          setAuthHeader(response.data.token);
          return response.data;
        } catch (error: any) {
  const errorMessage = error.response?.data?.message || 'Error register!';
  // більше деталей про помилку в вітповіді з сервера в errorMessage
  return thunkAPI.rejectWithValue(errorMessage);
}
    }
);

/*
 * POST @ /users/login
 * body: { email, password } = userInfo
 */
export const logIn = createAsyncThunk<
    AuthResponse,                  
    AuthCredentials,               
    { rejectValue: string }        
>( 'auth/login',
    async (userInfo, thunkAPI) => {
        try {
            const { data } = await axiosInstanceUser.post<AuthResponse>('/users/login', userInfo);
            // After successful login, add the token to the HTTP header
          setAuthHeader(data.token);
          // Збереження токену в localStorage
      localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error during login!");
        }
    }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk<
    void,                          // Нічого не повертається після логауту
    void,                          // Немає аргументів
    { rejectValue: string }        // Тип помилки
>('auth/logout', async (_, thunkAPI) => {
    try {
        await axiosInstanceUser.post('/users/logout');
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
  token: string | null; // Токен може приходити в деяких випадках
}


// функція відправки листа на пошту для авторизації (використовую власний бекенд)
interface ResetEmailResponse {
  email: string;
}

export const sendResetEmail = createAsyncThunk<ResetEmailResponse, string>(
  "auth/sendResetEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceUser.post("/api/auth/send-reset-email", { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error sending email");
    }
  }
);

// функція ресет пароля для сміни пароля та утентифікації (використовую власний бекенд)
export const resetPassword = createAsyncThunk<
  { message: string }, // Очікуваний формат відповіді
  { newPassword: string; token: string }, // Вхідні параметри
  { rejectValue: string } // Помилка
>(
  "auth/resetPassword",
  async ({ newPassword, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceUser.post("/api/auth/reset-pwd", { newPassword, token });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error resetting password");
    }
  }
);

export const refreshUser = createAsyncThunk<UserRefreshToken, void, { state: RootState; rejectValue: string }>(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue("No token found");
      }

      setAuthHeader(token); // Використовуємо `axiosInstanceUser`
      const response = await axiosInstanceUser.get<UserRefreshToken>("/users/current");

      console.log("User data from refresh:", response.data);
       // Зберігаємо оновлений токен localStorage
      localStorage.setItem("token", response.data.token || ""); //Додаємо перевірку
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error("Unauthorized, logging out...");
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue("Error refreshing user");
    }
  }
);


export default axios;
// нова версія щоб брати токен з локалсторедж:
// export const refreshUser = createAsyncThunk<
//   UserRefreshToken,
//   void,
//   { state: RootState }
// >(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const token = localStorage.getItem('token');  // Токен з localStorage

//     if (!token) {
//       console.log('No token found in localStorage');
//       return thunkAPI.rejectWithValue("No token found");
//     }

//     setAuthHeader(token); 
//     console.log('Token set in refreshUser:', axios.defaults.headers.common.Authorization);

//     try {
//       const response = await axiosInstanceUser.get<UserRefreshToken>("/users/current");
//       console.log('User data from refresh:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error refreshing user:', error);
//       return thunkAPI.rejectWithValue('Error refreshing user');
//     }
//   }
// );

// export default axios;


// Функція для оновлення користувача (refresh)
// export const refreshUsers = () => async (dispatch, getState: () => RootState) => {
//   dispatch(setRefreshing(true));

//   try {
//     const state = getState();
//     const token = state.auth.token;

//     if (!token) {
//       dispatch(logOut());
//       return;
//     }

//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     const { data } = await axios.get('/users/current'); // Отримуємо дані юзера

//     dispatch(updateUser(data));
//     dispatch(setRefreshing(false));
//   } catch (error: any) {
//     console.error('Помилка оновлення користувача:', error.response?.status);

//     if (error.response?.status === 401) {
//       dispatch(logOut());
//     }

//     dispatch(setRefreshing(false));
//   }
// };

//  Типізація відповіді від сервера (User) і стану Redux (RootState)
  // createAsyncThunk<ReturnedType, ThunkArg, ThunkAPIConfig>
 
// пояснення типізаціїї параметрів які додаю до createAsyncThunk<> : createAsyncThunk<ReturnedType, ThunkArg, ThunkAPIConfig>
// ReturnedType: Тип, який повертається після успішного запиту. У нашому випадку це User.
// ThunkArg: Аргументи, які функція приймає під час виклику. Ми не передаємо аргументів, тому використовуємо void.
// ThunkAPIConfig: Типізація для thunkAPI.Ми використовуємо { state: RootState }, щоб мати доступ до типізованого Redux стану.

// при спробі регітрації в ПОСТМЕН бекенд працює і приходе такий обєкт вітповіді :
// {
//     "user": {
//         "name": "Joni Li",
//         "email": "joni1978aleks@gmail.com"
//     },
//     "token": "eyJhbGciOiJIUzI"
// }

// // this obgect correct Login end Refresh: 
// email
// : 
// "4725NilaAleks@gmail.com"
// name
// : 
// "AleksandrNIsa"
// password
// : 
// "4725NilaAlex789"