// auth - autorizations
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {RootState} from '../store'

axios.defaults.baseURL = 'https://connections-api.goit.global/';

type AuthToken = {
    token: string;
};

export interface UserData {
  id: string;
  name: string;
  email: string;
  token: string | null;  // Токен може приходити в деяких випадках
};

export interface AuthState {
  user: UserData | null;
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

// Тип для відповіді від API (user + token)
interface AuthResponse {
    user: UserData;
    token: string;
};
// Utility to add JWT - (token)
const setAuthHeader = (token: string | null) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT - token
const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};
// POST @/users/signup
export const register = createAsyncThunk<
    AuthResponse,                  // Тип даних, які повертаються після успішної реєстрації
    AuthCredentials,               // Тип аргументів, які передаються у функцію
    { rejectValue: string }        // Тип помилки, що повертається у випадку невдачі
>( 'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post<AuthResponse>('/users/signup', credentials);
            // After successful registration, add the token to the HTTP header
          setAuthHeader(response.data.token);
          console.log('Registered user:', response.data); // Логування відповіді
      console.log('Token set in header:', axios.defaults.headers.common.Authorization); // Перевірка заголовка
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error register !');
        }
    }
);

// варіант з трохи простішою типізацією:
// export const register = createAsyncThunk(
//   "auth/register",
//   async (userData: UsRegisterVelues, thunkAPI) => {
//     try {
//       const response = await api.post("/register", userData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
/*
 * POST @ /users/login
 * body: { email, password } = credentials
 */
export const logIn = createAsyncThunk<
    AuthResponse,                  
    AuthCredentials,               
    { rejectValue: string }        
>( 'auth/login',
    async (userInfo, thunkAPI) => {
        try {
            const { data } = await axios.post<AuthResponse>('/users/login', userInfo);
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
        await axios.post('/users/logout');
        // After a successful logout, remove the token from the HTTP header
      clearAuthHeader();
      localStorage.removeItem('token');  // Видалення токену з localStorage
    } catch (error) {
        return thunkAPI.rejectWithValue('Error logOut !');
    }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */
/**
 * Типізація відповіді від сервера (User) і стану Redux (RootState)
 * createAsyncThunk<ReturnedType, ThunkArg, ThunkAPIConfig>
 */

// пояснення типізаціїї: createAsyncThunk<ReturnedType, ThunkArg, ThunkAPIConfig>
// ReturnedType: Тип, який повертається після успішного запиту. У нашому випадку це User.
// ThunkArg: Аргументи, які функція приймає під час виклику. Ми не передаємо аргументів, тому використовуємо void.
//     ThunkAPIConfig: Типізація для thunkAPI.Ми використовуємо { state: RootState }, щоб мати доступ до типізованого Redux стану.

// export const refreshUser = createAsyncThunk<
//   UserData,              
//   void,                  
//   { state: RootState; rejectValue: string }  // Доступ до стану Redux + тип помилки
// >(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const reduxState = thunkAPI.getState();
//     const token = reduxState.auth.user?.token;

//     if (token) {
//       setAuthHeader(token);  // Встановлюємо токен у заголовок
//     } else {
//       return thunkAPI.rejectWithValue("No token found");  // Якщо токену немає, повертаємо помилку
//     }

//     const response = await axios.get<UserData>("/users/current");
//     return response.data;  // Повертаємо лише дані користувача
//   },
//   {
//     condition: (_, thunkAPI) => {
//       const reduxState = thunkAPI.getState();
//       return reduxState.auth.user?.token !== null; // Виконується тільки якщо токен існує
//     },
//   }
// );

// нова версія щоб брати токен з локалсторедж:
export const refreshUser = createAsyncThunk<
  UserData,
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
      const response = await axios.get<UserData>("/users/current");
      console.log('User data from refresh:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error refreshing user:', error);
      return thunkAPI.rejectWithValue('Error refreshing user');
    }
  }
);


// export const refreshUser = createAsyncThunk(
//     "auth/refresh",
//     async (_, thunkAPI) => {
//         const reduxState = thunkAPI.getState();
//         setAuthHeader(reduxState.auth.token);
//         const response = await axios.get("/users/current");
//         return response.data;
//     },
//     {
//         condition: (_, thunkAPI) => {
//             const reduxState = thunkAPI.getState();
//             return reduxState.auth.token !== null;
//         },
//     }
// );

export default axios
// приклад нижче ( з умовою)
// export const refreshUser = createAsyncThunk(
//     'auth/refresh',
//     async (_, thunkAPI) => {
//         // Reading the token from the state via getState()
//         const state = thunkAPI.getState();
//         const persistedToken = state.auth.token;

//         if (persistedToken === null) {
//             // If there is no token, exit without performing any request
//             return thunkAPI.rejectWithValue('Unable to fetch user');
//         }

//         try {
//             // If there is a token, add it to the HTTP header and perform the request
//             setAuthHeader(persistedToken);
//             const { data } = await axios.get('/users/me');
//             return data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );




// при регітрації бекенд працює і приходе такий обєкт вітповіді : {
//     "user": {
//         "name": "Joni Li",
//         "email": "joni1978aleks@gmail.com"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2FhNDRjNWM0OTVlZDZlMjVmM2RiMzYiLCJpYXQiOjE3MzkyMTE5NzN9.6ucfW4qeSjSszPuj5SFNgGc0A5h7YJ0BNMVar4kx5Ek"
// }