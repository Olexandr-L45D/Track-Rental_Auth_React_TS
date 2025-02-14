import { configureStore } from "@reduxjs/toolkit";
import tasksReducerCard from "./campers/slice";
import { filtersReducer } from "./filters/slice";
import languageReducer from "./sliceLanguage";
import { authReducer } from "./auth/slice";
import storage from "redux-persist/lib/storage";
import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";

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
import { logOut } from "./auth/operations";

const persistedAuthReducer = persistReducer(
  {
    key: "jwt-token",
    storage,
    whitelist: ["token", "user"],
  },
  authReducer
);

const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload === "Unauthorized") {
    console.error("Unauthorized, logging out...");
    localStorage.removeItem("token");

    const dispatch = store.dispatch as AppDispatch; // Оголошуємо dispatch із правильним типом
    dispatch(logOut());

    window.location.href = "/";
  }
  return next(action);
};


export const store = configureStore({
  reducer: {
    campers: tasksReducerCard,
    filters: filtersReducer,
    auth: persistedAuthReducer,
    language: languageReducer, // Додаємо в Redux in sliceLanguage-translate
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["auth.token", "auth.user"], // Додав ігнорування шляхів, які персистяться
      },
      immutableCheck: {
        warnAfter: 64, 
      },
    }).concat(authMiddleware), // Додаємо authMiddleware у ланцюжок,
});
// Додаємо тип для глобального стану (що необхідно для простішої типізації на TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
// Визначаємо тип AppDispatch
export type AppDispatch = typeof store.dispatch;


// TypeScript підкреслює код, бо action має узагальнений тип unknown, і він не знає, чи є в ньому
// Використав isRejectedWithValue(action) — це вбудована утиліта @reduxjs/toolkit, яка перевіряє, чи action є rejected.
// TypeScript не може автоматично визначити, що store.dispatch підтримує AsyncThunk.
// store.dispatch за замовчуванням має загальний тип Dispatch<AnyAction>, і він не знає про logOut().
// Ми явно приводимо store.dispatch до AppDispatch, який уже містить всі типізовані thunks.