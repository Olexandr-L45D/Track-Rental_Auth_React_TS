import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllTruck, fetchAllTruckLanguage, findTruckById } from "./operations";
// import { TruckDetailById } from "../../components/TruckDetails/TruckDetails";

export interface Truck{
  id: number;
  name: string;
  location: string;
};
// Тип TruckDetailById на базі Truck розширений властивостями для детальної інформації про вантажівку
export interface TruckDetailById extends Truck {
  rating: number;
  price: number;
  gallery: { original: string; thumb: string }[];
  description: string;
  reviews?: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
}
interface State{
  items: Truck[] | TruckDetailById[]; // Це має бути або список вантажівок, або деталі
  total: number;
  loading: boolean;
  isFetched: boolean;
  error: string | null;
  selectedTruck: TruckDetailById | null; // Для збереження деталей вантажівки
  isBooked: boolean;
  totalpages: number;
  page: number;
};
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
  extraReducers: (builder) => {
    builder
      // fetchAllTruck
      .addCase(fetchAllTruck.pending, (state) => {
        state.loading = true;
      })
        .addCase(fetchAllTruck.fulfilled, (state: State, action: PayloadAction<{ items: Truck[]; total: number }>) => {
  const newItems = action.payload.items.filter(
    (item: Truck) => !state.items.some((existing: Truck) => existing.id === item.id)
  );
        state.items = [...state.items, ...newItems];
        state.loading = false;
        state.isFetched = true;
        state.totalpages = Math.ceil(action.payload.total / 4);
        if (state.page < state.totalpages) {
          state.page += 1;
        }
      })
      .addCase(fetchAllTruck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchAllTruckLanguage
      .addCase(fetchAllTruckLanguage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTruckLanguage.fulfilled, (state, action: PayloadAction<Truck[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTruckLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // findTruckById
      .addCase(findTruckById.fulfilled,
        (state, action: PayloadAction<TruckDetailById>) => {
        state.selectedTruck = action.payload;
        state.loading = false;
      })
      .addCase(findTruckById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default campersSlice.reducer;

