import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTruck, findTruckById } from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    loading: false,
    isFetched: false,
    error: null,
    selectedTruck: null, // Для збереження деталей вантажівки
    isBooked: false,
    totalpages: 1,
    page: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllTruck.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllTruck.fulfilled, (state, action) => {
        console.log("Fetched Items:", action.payload.items);
        const newItems = action.payload.items.filter(
          item => !state.items.some(existing => existing.id === item.id)
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
        state.error = action.error.message;
      })
      .addCase(findTruckById.pending, state => {
        state.loading = true;
      })
      .addCase(findTruckById.fulfilled, (state, action) => {
        state.selectedTruck = action.payload; // Зберігаємо деталі вантажівки
        state.loading = false;
        state.error = null;
      })
      .addCase(findTruckById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Серіалізовані дані про помилку
      });
  },
});

export default campersSlice.reducer;
