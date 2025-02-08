import { createSlice } from "@reduxjs/toolkit";

type FiltersState = {
  filters: {
    location: string;
  };
};
const initialState:FiltersState = {
  filters: {
    location: "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { filterName, value } = action.payload;
      state.filters = { ...state.filters, [filterName]: value };
    },
    setChangeFilter: (state, action) => {
      console.log("Changing all filters:", action.payload); 
      state.filters = action.payload || { location: "Ukraine, Kyiv" }; // Значення за замовчуванням саме { location: "" }
    },
  },
});

export const { setChangeFilter, setFilter } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;




