import { configureStore } from "@reduxjs/toolkit";
import tasksReducerCard from "./campers/slice";
import { filtersReducer } from "./filters/slice";
import languageReducer from "./sliceLanguage";
import { authReducer } from "./auth/slice";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";

const persistedAuthReducer = persistReducer(
  {
    key: "jwt-token",
    storage,
    whitelist: ["token", "user"],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    campers: tasksReducerCard,
    filters: filtersReducer,
    auth: persistedAuthReducer,
    language: languageReducer, // Додаємо в Redux in sliceLanguage-translate
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["auth.token", "auth.user"], // Додав ігнорування шляхів, які персистяться
      },
      immutableCheck: {
        warnAfter: 64, 
      },
    }),
});
// Додаємо тип для глобального стану (що необхідно для простішої типізації на TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
// Визначаємо тип AppDispatch
export type AppDispatch = typeof store.dispatch;


