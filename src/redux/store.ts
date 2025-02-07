import { configureStore } from "@reduxjs/toolkit";
import tasksReducerCard from "./campers/slice";
import { filtersReducer } from "./filters/slice";
import languageReducer from "./sliceLanguage";

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    campers: tasksReducerCard,
    filters: filtersReducer,
    language: languageReducer, // Додаємо в Redux in sliceLanguage-translate
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {
        warnAfter: 64, // Збільшити порогове значення до 64мс (або більше)
      },
    }),
});

export const persistor = persistStore(store);
