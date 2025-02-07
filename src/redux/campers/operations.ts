import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import i18next from "i18next";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";
// axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";
const translateText = async (text, targetLanguage) => {
  if (!text || text.trim() === "") {
    console.warn("Немає тексту для перекладу");
    return text;
  }

  // Додаємо перевірку на наявність спецсимволів (email, числа, ім'я без пробілів)
  if (
    text.includes("@") ||
    /^\d+$/.test(text) ||
    text.split(" ").length === 1
  ) {
    console.warn("Можливо, це ім'я, число, email. Пропускаємо переклад.");
    return text;
  }

  try {
    const response = await fetch(
      `https://lingva.ml/api/v1/translate/en/${targetLanguage}/${encodeURIComponent(
        text
      )}`
    );

    if (!response.ok) {
      throw new Error(`HTTP помилка! Статус: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.translation) {
      console.error("Помилка перекладу: некоректні дані від API", data);
      return text;
    }

    return data.translation;
  } catch (error) {
    console.error("Помилка запиту:", error);
    return text;
  }
};

// Функція для отримання контактів з бекенду і перекладу їх
export const fetchAllTruckLanguage = createAsyncThunk(
  "campers/fetchAllTruck",
  async (_, { thunkAPI, getState }) => {
    try {
      const response = await axios.get("/campers");
      const campers = response.data;

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
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAllTruck = createAsyncThunk(
  "campers/fetchAllTruck",

  async ({ page = 1 }, { thunkAPI, getState }) => {
    try {
      const filter = getState().filters.filters;

      const response = await axios.get("/campers", {
        params: {
          page,
          filter,
          limit: 4,
        },
      });

      return response.data;
      // `axios` автоматично повертає вже розпарсений JSON у response.data
    } catch (e) {
      // При помилці запиту повертаємо проміс, який буде відхилений з текстом помилки
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const findTruckById = createAsyncThunk(
  "campers/findTruckById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/campers/${id}`);
      return response.data; // Повертаємо об'єкт, який прийшов із сервера
    } catch (error) {
      // Перевіряємо, чи це AxiosError, і передаємо серіалізовану інформацію
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: error.message,
      });
    }
  }
);

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
