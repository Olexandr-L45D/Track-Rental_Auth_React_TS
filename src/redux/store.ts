import { configureStore, Middleware, isRejectedWithValue, Tuple } from "@reduxjs/toolkit";
import tasksReducerCard from "./campers/slice";
import { filtersReducer } from "./filters/slice";
import languageReducer from "./sliceLanguage";
import { authReducer } from "./auth/slice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// ✅ Персистований редюсер

// const persistedAuthReducer = persistReducer(
//   {
//     key: "jwt-token",
//     storage,
//     whitelist: ["accessToken", "user", "isLoggedIn"],
//   },
//   authReducer
// );

// ✅ Оновлений persistConfig
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user", "isLoggedIn"], // ✅ Додано `isLoggedIn`
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// ✅ Middleware для обробки 401 Unauthorized
const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload === "Unauthorized") {
    console.error("Unauthorized, logging out...");
    localStorage.removeItem("token");
    window.location.href = "/"; 
    return;
  }
  return next(action);
};
// ✅ Створення Store (без зайвих DevTools!)
export const store = configureStore({
  reducer: {
    campers: tasksReducerCard,
    filters: filtersReducer,
    auth: persistedAuthReducer,
    language: languageReducer,
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["auth.token", "auth.user"],
      },
      immutableCheck: { warnAfter: 64 },
    }).concat(authMiddleware) as Tuple<[Middleware, Middleware]>, // ✅ Фіксуємо типізацію

});

// ✅ Типізація для `dispatch` та persistor
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = typeof store.dispatch & ((action: any) => Promise<any>);
export const persistor = persistStore(store);





// {
//     "rewrites": [
//         {
//             "source": "/(.*)",
//             "destination": "/index.html"
//         }
//     ]
// }

  