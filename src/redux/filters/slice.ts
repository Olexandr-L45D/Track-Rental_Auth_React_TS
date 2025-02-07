import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    location: "",
    // location: "Ukraine, Kyiv",
  },
};

// export const setChangeFilter = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     setFilter: (state, action) => {
//       console.log("Updating filter:", action.payload); // Додайте це
//       state.filters[action.payload.filterName] = action.payload.value;
//     },
//   },
// });

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { filterName, value } = action.payload;
      console.log("Set filter currents:", filterName, value); // Діагностика
      console.log("Updating filter:", action.payload); // Додайте це
      state.filters = { ...state.filters, [filterName]: value };
    },
    // setChangeFilter: (state, action) => {
    //   state.filters = action.payload; // Оновлюємо всі фільтри
    // },
    setChangeFilter: (state, action) => {
      console.log("Changing all filters:", action.payload); // Лог
      // state.filters = action.payload || {}; // Оновлення фільтрів чи порожній обєкт
      state.filters = action.payload || { location: "Ukraine, Kyiv" }; // Значення за замовчуванням саме { location: "" }
    },
  },
});

export const { setChangeFilter, setFilter, resetFilters } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

//  const filtersSlice = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     setFilter(state, action) {
//       const { filterName, value } = action.payload;
//       console.log("Set filter currents:", filterName, value); // Діагностика
//       state.filters = { ...state.filters, [filterName]: value };
//     },
//     // setFilter(state, action) {
//     //   const { filterName, value } = action.payload;
//     //   state.filters = { ...state.filters, [filterName]: value,
//     //   };
//     // },

//     setChangeFilter: (state, action) => {
//       state.filters = action.payload; // Оновлюємо всі фільтри
//     },
//     // resetFilters(state) {
//     //   state.filters = {};
//     // },
//   },
// });

// filters: "",
// filters: {},
// filters: {
//   location: "Ukraine, Kyiv",
// },

// {
//   filters: {
//     filters: {
//       location: "Ukraine, Kyiv",
//       kitchen: true,
//       ...
//     }
//   },
//   campers: {
//     items: [...],
//     ...
//   }
// }

// const initialState = {
//   filters: {},
// };

// const filtersSlice = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     setFilter(state, action) {
//       const { filterName, value } = action.payload;
//       state.filters[filterName] = value;
//     },
//     resetFilters(state) {
//       state.filters = {};
//     },
//   },
// });

// add filtersReducer

// const initialState = {
//   location: "",
//   feature1: false,
//   feature2: false,
// };

// const filtersReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return {
//         ...state,
//         [action.payload.key]: action.payload.value,
//       };
//     default:
//       return state;
//   }
// };

// export default filtersReducer;
