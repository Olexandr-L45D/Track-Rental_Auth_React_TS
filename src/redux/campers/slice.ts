import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllTruck,
  fetchAllTruckLanguage,
  findTruckById,
} from "./operations";
import {
  State,
  Truck,
  TruckDetailWithId,
} from "../../components/App/App.types";

const initialState: State = {
  items: [],
  total: 0,
  loading: false,
  isFetched: false,
  error: null,
  selectedTruck: null, // Для збереження деталей вантажівки
  isBooked: false,
  totalpages: 1,
  page: 1,
};
//  узгодити типи у PayloadAction\from "@reduxjs/toolkit"; з тим, що повертає createAsyncThunk. Додамо типізацію TruckDetailById для selectedTruck.
const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllTruck.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchAllTruck.fulfilled,
        (
          state: State,
          action: PayloadAction<{ items: Truck[]; total: number }>
        ) => {
          const newItems = action.payload.items.filter(
            (item: Truck) =>
              !state.items
                .filter((existing): existing is Truck => "location" in existing) // фільтрую тільки Truck по location
                .some(existing => existing.id === item.id)
          );
          state.items = [...state.items, ...newItems];
          state.loading = false;
          state.isFetched = true;
          state.totalpages = Math.ceil(action.payload.total / 4);
          if (state.page < state.totalpages) {
            state.page += 1;
          }
        }
      )
      .addCase(fetchAllTruck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllTruckLanguage.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchAllTruckLanguage.fulfilled,
        (state, action: PayloadAction<Truck[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAllTruckLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        findTruckById.fulfilled,
        (state, action: PayloadAction<TruckDetailWithId>) => {
          state.selectedTruck = action.payload;
          state.loading = false;
        }
      )
      .addCase(findTruckById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default campersSlice.reducer;
