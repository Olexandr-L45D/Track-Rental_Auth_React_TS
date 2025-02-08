import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TruckDetailById } from "../../components/TruckDetails/TruckDetails";
import { RootState } from "../store"; 
import { Truck } from "./slice";
axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";
interface FetchAllTruckParams { page?: number; };
//  розшифровка змін при типізації fetchAllTruck
// export const fetchAllTruck = createAsyncThunk<
//   TruckListResponse,         // Тип даних, які повертаються
//   FetchAllTruckParams,       // Тип параметрів (наприклад, { page })
//   { state: RootState }       // Тип стану (getState)
// >(
export interface TruckListResponse {
  items: Truck[];  // Перевір, що тут саме 'items'
  total: number;
}
export const fetchAllTruck = createAsyncThunk
  <TruckListResponse, FetchAllTruckParams, { state: RootState }>(
  "campers/fetchAllTruck",
// Ми відразу витягуємо потрібні методи (getState і rejectWithValue) через деструктуризацію параметрів функції.
  async ({ page = 1 }, { getState, rejectWithValue }) => {
    try {
      const filter = getState().filters.filters;
      const response = await axios.get<TruckListResponse>("/campers", {
        params: { page, filter, limit: 4,},
      });
      return response.data;
      // `axios` автоматично повертає вже розпарсений JSON у response.data
    } catch (e: any) {
      // При помилці запиту повертаємо проміс, який буде відхилений з текстом помилки
      return rejectWithValue(e.message);
    }
  }
);

export const findTruckById = createAsyncThunk<TruckDetailById, number>(
  'campers/findTruckById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/campers/${Number(id)}`);  // бекенд приймає число `/campers/${Number(id)}`
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch truck details');
    }
  }
);

const translateText = async (text: string, language: string): Promise<string> => {
  if (!text || text.trim() === "") {
    console.warn("Немає тексту для перекладу");
    return text;
  }
  if (language === 'ua') {
    return `UA: ${text}`; // переклад
  }
  return text; // Якщо англійська, повертаємо оригінальний текст
}; // Функція fetchAllTruckLanguage для отримання контактів з бекенду і їх перекладу 
export const fetchAllTruckLanguage = createAsyncThunk<
  Truck[], FetchAllTruckParams, { state: RootState }      
>(
  "campers/fetchAllTruckLanguage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get("/campers");
      const campers:Truck[] = response.data;
      // Отримуємо поточну мову з Redux (з дефолтним значенням)
      const currentLanguage = getState().language || "en";
      if (currentLanguage === "en") {
        return campers; // Якщо англійська, не перекладаємо
      }
      // Перекладемо на поточну мову
      const translatedCampers = await Promise.all(
        campers.map(async camper => ({
          ...camper,
          name: await translateText(camper.name, currentLanguage),
        }))
      );
      return translatedCampers;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);





// export const fetchAllTruckLanguage = createAsyncThunk(
//   "campers/fetchAllTruck",
//   async (_, { thunkAPI, getState }) => {
//     try {
//       const response = await axios.get("/campers");
//       const campers = response.data;

//       // Отримуємо поточну мову з Redux (з дефолтним значенням)
//       const currentLanguage = getState().language || "en";

//       if (currentLanguage === "en") {
//         return campers; // Якщо англійська, не перекладаємо
//       }

//       // Перекладемо на поточну мову
//       const translatedCampers = await Promise.all(
//         campers.map(async camper => ({
//           ...camper,
//           name: await translateText(camper.name, currentLanguage),
//         }))
//       );

//       return translatedCampers;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const fetchAllTruck = createAsyncThunk<TruckListResponse, FetchAllTruckParams>(
//   "campers/fetchAllTruck",

//   async ({ page = 1 }, { thunkAPI, getState }) => {
//     try {
//       const filter = getState().filters.filters;

//       const response = await axios.get("/campers", {
//         params: {
//           page,
//           filter,
//           limit: 4,
//         },
//       });

//       return response.data;
//       // `axios` автоматично повертає вже розпарсений JSON у response.data
//     } catch (e) {
//       // При помилці запиту повертаємо проміс, який буде відхилений з текстом помилки
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const findTruckById = createAsyncThunk<TruckDetailById, number>(
//   "campers/findTruckById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(`/campers/${id}`);
//       return response.data; // Повертаємо об'єкт, який прийшов із сервера
//     } catch (error) {
//       // Перевіряємо, чи це AxiosError, і передаємо серіалізовану інформацію
//       return thunkAPI.rejectWithValue({
//         status: error.response?.status,
//         message: error.message,
//       });
//     }
//   }
// );

// old-start - example fetchAllTruck
// export const fetchAllTruck = createAsyncThunk(
//   "campers/fetchAllTruck",
//   async ({ page = 1 }, { getState, rejectWithValue }) => {
//     try {
//       const filter = getState().filters?.filters || {};
//       const currentLanguage = getState().language || i18next.language || "en";

//       const response = await axios.get("/campers", {
//         params: {
//           page,
//           filter,
//           limit: 4,
//         },
//       });

//       const campers = response.data;

//       if (currentLanguage === "en") {
//         return { originalData: campers, translatedData: campers }; // Повертаємо однакові дані для зручності
//       }
//       // Перекладаємо потрібні поля
//       const translatedCampers = await Promise.all(
//         campers.map(async camper => ({
//           ...camper,
//           name: await translateText(camper.name, currentLanguage),
//           description: await translateText(camper.description, currentLanguage),
//           location: await translateText(camper.location, currentLanguage),
//         }))
//       );

//       return { originalData: campers, translatedData: translatedCampers };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchAllTruck = createAsyncThunk(
//   "campers/fetchAllTruck",
//   // in fetchContact Використовуємо символ підкреслення як ім'я першого параметра, тому що в цій операції він нам не потрібен ( а пусто не можна залишати!)
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/campers");

//       return response.data.items;
//       // `axios` автоматично повертає вже розпарсений JSON у response.data
//     } catch (e) {
//       // При помилці запиту повертаємо проміс, який буде відхилений з текстом помилки
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );



// const translateText = async (text, targetLanguage) => {
//   if (!text || text.trim() === "") {
//     console.warn("Немає тексту для перекладу");
//     return text;
//   }

//   // Додаємо перевірку на наявність спецсимволів (email, числа, ім'я без пробілів)
//   if (
//     text.includes("@") ||
//     /^\d+$/.test(text) ||
//     text.split(" ").length === 1
//   ) {
//     console.warn("Можливо, це ім'я, число, email. Пропускаємо переклад.");
//     return text;
//   }

//   try {
//     const response = await fetch(
//       `https://lingva.ml/api/v1/translate/en/${targetLanguage}/${encodeURIComponent(
//         text
//       )}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP помилка! Статус: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data || !data.translation) {
//       console.error("Помилка перекладу: некоректні дані від API", data);
//       return text;
//     }

//     return data.translation;
//   } catch (error) {
//     console.error("Помилка запиту:", error);
//     return text;
//   }
// };
