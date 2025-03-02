import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store"; 
import { Truck, TruckDetailById } from "../../components/App/App.types";

const axiosInstanceTruksOperations = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io", // Тут базовий URL для отримання даних
});

interface FetchAllTruckParams { page?: number; };

export interface TruckListResponse {
  items: Truck[];  
  total: number;
}

// export const fetchAllTruck = createAsyncThunk
//   <TruckListResponse, FetchAllTruckParams, { state: RootState }>(
//   "campers/fetchAllTruck",
//   async ({ page = 1 }, { getState, rejectWithValue }) => {
//     try {
//       const filter = getState().filters.filters;
//       const response = await axiosInstanceTruksOperations.get<TruckListResponse>("/campers", {
//         params: { page, filter, limit: 4,},
//       });
//       return response.data;
//     } catch (e: any) {
//       return rejectWithValue(e.message);
//     }
//   }
// );


export const fetchAllTruck = createAsyncThunk<TruckListResponse, FetchAllTruckParams, { state: RootState }>(
  "campers/fetchAllTruck",
  async ({ page = 1 }, { getState, rejectWithValue }) => {
    try {
      const filter = getState().filters.filters;
      const response = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?page=${page}&limit=4&filter=${filter}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);


export const findTruckById = createAsyncThunk<TruckDetailById, number>(
  'campers/findTruckById',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${Number(id)}`
      );
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch truck details');
    }
  }
);


// export const findTruckById = createAsyncThunk<TruckDetailById, number>(
//   'campers/findTruckById',
//   async (id, thunkAPI) => {
//     try {
//       const response = await axiosInstanceTruksOperations.get(`/campers/${Number(id)}`);  // бекенд приймає число `/campers/${Number(id)}`
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Failed to fetch truck details');
//     }
//   }
// );

const translateText = async (text: string, language: string): Promise<string> => {
  if (!text || text.trim() === "") {
    console.warn("Немає тексту для перекладу");
    return text;
  }
  if (language === 'ua') {
    return `UA: ${text}`; // переклад
  }
  return text; // Якщо англійська, повертаємо оригінальний текст
};
// Функція fetchAllTruckLanguage для отримання контактів з бекенду і їх перекладу 
export const fetchAllTruckLanguage = createAsyncThunk<
  Truck[], FetchAllTruckParams, { state: RootState }      
>(
  "campers/fetchAllTruckLanguage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstanceTruksOperations.get("/campers");
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


//  розшифровка змін при типізації fetchAllTruck
// export const fetchAllTruck = createAsyncThunk<
//   TruckListResponse,         // Тип даних, які повертаються
//   FetchAllTruckParams,       // Тип параметрів (наприклад, { page })
//   { state: RootState }       // Тип стану (getState)

