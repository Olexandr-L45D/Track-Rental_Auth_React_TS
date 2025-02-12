
import { createSlice } from "@reduxjs/toolkit";

const initialState = "en"; 

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => action.payload,
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

// type Language = "en" | "uk"; 

// Ініціальний стан типізуємо як одну з дозволених мов
// const initialState: Language = "en";

// const languageSlice = createSlice({
//   name: "language",
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<Language>) => {
//       return action.payload;  // Явно повертаємо новий стан
//     },
//   },
// });

// const initialState = { language: "en" as Language };

// const languageSlice = createSlice({
//   name: "language",
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<Language>) => {
//       state.language = action.payload;  // Пряма мутація стану
//     },
//   },
// });

// export const { setLanguage } = languageSlice.actions;
// export default languageSlice.reducer;

