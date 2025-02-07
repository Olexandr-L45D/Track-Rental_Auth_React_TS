import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllTruck, findTruckById } from "./operations";

export type Truck = {
  id: string;
  name: string;
  location: string; 
};
type State = {
  items: Truck[];
  loading: boolean;
  isFetched: boolean;
  error: string | null;
  selectedTruck: Truck | null; // Для збереження деталей вантажівки
  isBooked: boolean;
  totalpages: number;
  page: number;
};

const initialState: State = {
  items: [],
  loading: false,
  isFetched: false,
  error: null,
  selectedTruck: null, // Для збереження деталей вантажівки
  isBooked: false,
  totalpages: 1,
  page: 1,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllTruck.pending, state => {
        state.loading = true;
      })
        .addCase(fetchAllTruck.fulfilled, (state: State, action: PayloadAction<{ items: Truck[]; total: number }>) => {
      
          const newItems = action.payload.items.filter(
  (item: Truck) => !state.items.some((existing: Truck) => existing.id === item.id)
          );
          console.log(typeof state.items, state.items);
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
        state.error = action.error.message || 'Unknown error';
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
        state.error = action.error.message || 'Error fetching truck details';
      });
  },
});

export default campersSlice.reducer;



// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case 'LOADING':
//       return { ...state, loading: true, error: null };
//     case 'SUCCESS':
//       return { loading: false, error: null, item: action.payload };
//     case 'ERROR':
//       return { ...state, loading: false, error: action.error };
//     default:
//       throw new Error();
//   }
// }

// initialState: {
  //   items: [],
  //   loading: false,
  //   isFetched: false,
  //   error: null,
  //   selectedTruck: null, // Для збереження деталей вантажівки
  //   isBooked: false,
  //   totalpages: 1,
  //   page: 1,
  // },