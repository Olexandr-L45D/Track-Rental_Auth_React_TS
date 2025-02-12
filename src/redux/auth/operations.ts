// auth - autorizations
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {RootState} from '../store'

const axiosInstanceUser = axios.create({
  baseURL: "https://connections-api.goit.global/",
});
// Utility to add JWT - (token)
const setAuthHeader = (token: string | null) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
// Utility to remove JWT - token
const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export interface UserRefreshToken {
  id: string;
  name: string;
  email: string;
  token: string | null;  // Токен може приходити в деяких випадках
};

export interface UserDataRes {
  name: string;
  email: string;
};
export interface AuthState {
  user: UserDataRes | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isError: boolean | string; // Якщо помилка повертає рядок
  isLoading: boolean;
};

// Тип для даних реєстрації/логіну
interface AuthCredentials {
    email: string;
    password: string;
};

interface AuthResponse {
  token: string;
  user: {
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
         // Додаємо токен в заголовки для наступних запитів
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

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
            return thunkAPI.rejectWithValue('Error login !');
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

// нова версія щоб брати токен з локалсторедж:
export const refreshUser = createAsyncThunk<
  UserRefreshToken,
  void,
  { state: RootState }
>(
  "auth/refresh",
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');  // Токен з localStorage

    if (!token) {
      console.log('No token found in localStorage');
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token); 
    console.log('Token set in refreshUser:', axios.defaults.headers.common.Authorization);

    try {
      const response = await axiosInstanceUser.get<UserRefreshToken>("/users/current");
      console.log('User data from refresh:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error refreshing user:', error);
      return thunkAPI.rejectWithValue('Error refreshing user');
    }
  }
);

export default axios;




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