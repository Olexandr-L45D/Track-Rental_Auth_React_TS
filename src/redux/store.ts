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

  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] as const,
  //       ignoredPaths: ["auth.token", "auth.user"],
  //     },
  //     immutableCheck: { warnAfter: 64 },
  //   }).concat(authMiddleware) as ReturnType<typeof getDefaultMiddleware>,
  // } 
  

 // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       ignoredPaths: ["auth.token", "auth.user"],
  //     },
  //     immutableCheck: { warnAfter: 64 },
  //   }).concat(authMiddleware) as Middleware[], // ✅ Фіксимо типізацію


// const authMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
//   if (isRejectedWithValue(action) && action.payload === "Unauthorized") {
//     console.error("Unauthorized, logging out...");
//     localStorage.removeItem("token");
//     window.location.href = "/"; 
//   }
//   return next(action);
// };


// import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
// import { configureStore } from "@reduxjs/toolkit";
// import tasksReducerCard from "./campers/slice";
// import { filtersReducer } from "./filters/slice";
// import languageReducer from "./sliceLanguage";
// import { authReducer } from "./auth/slice";
// import storage from "redux-persist/lib/storage";
// import { Middleware, isRejectedWithValue, MiddlewareAPI, Dispatch, AnyAction } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// // ✅ ВАЖЛИВО: ПРАВИЛЬНИЙ ІМПОРТ
// import { compose } from "redux";
// import { devToolsEnhancer } from "@redux-devtools/extension";
// // **1️⃣ Персистований редюсер**
// const persistedAuthReducer = persistReducer(
//   {
//     key: "jwt-token",
//     storage,
//     whitelist: ["accessToken", "user", "isLoggedIn"],
//   },
//   authReducer
// );
// // **2️⃣ Middleware для обробки 401 Unauthorized**
// const authMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
//   if (isRejectedWithValue(action) && action.payload === "Unauthorized") {
//     console.error("Unauthorized, logging out...");
//     localStorage.removeItem("token");
//     window.location.href = "/"; 
//   }
//   return next(action);
// };

// // const authMiddleware: Middleware = (store) => (next) => (action) => {
// //   if (isRejectedWithValue(action) && action.payload === "Unauthorized") {
// //     console.error("Unauthorized, logging out...");
// //     localStorage.removeItem("token");
// //     // const dispatch = store.dispatch as AppDispatch;
// //     // dispatch(logOut()); // ❌ ЗАКОМЕНТОВАНО ДЛЯ ТЕСТУ
// //     window.location.href = "/";
// //   }
// //   return next(action);
// // };


// // **3️⃣ Створення Store**
// export const store = configureStore({
//   reducer: {
//     campers: tasksReducerCard,
//     filters: filtersReducer,
//     auth: persistedAuthReducer,
//     language: languageReducer,
//   },middleware: (getDefaultMiddleware) => [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       ignoredPaths: ["auth.token", "auth.user"],
//     },
//     immutableCheck: { warnAfter: 64 },
//   }),
//   authMiddleware, // ✅ Middleware додається правильно
// ],

// });


// // **3️⃣ Правильна типізація для `dispatch`**
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunkDispatch = typeof store.dispatch & ((action: any) => Promise<any>);

// // **4️⃣ Персистор**
// export const persistor = persistStore(store);



// це стара версія міделвари, замінив на підхід з масивом
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       ignoredPaths: ["auth.token", "auth.user"],
  //     },
  //     immutableCheck: {
  //       warnAfter: 64,
  //     },
  //   }).concat(authMiddleware), // ✅ Додаємо middleware КОРЕКТНО
  
//  enhancers: [devToolsEnhancer({ trace: true })], // ✅ Виправлено
  // enhancers: [composeWithDevTools()], // ✅ Виправлено `composeWithDevTools`
  //  enhancers: [compose(devToolsEnhancer())], // Виправлено `composeWithDevTools`




// import { configureStore } from "@reduxjs/toolkit";
// import tasksReducerCard from "./campers/slice";
// import { filtersReducer } from "./filters/slice";
// import languageReducer from "./sliceLanguage";
// import { authReducer } from "./auth/slice";
// import storage from "redux-persist/lib/storage";
// import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// // ✅ ВАЖЛИВО: ПРАВИЛЬНИЙ ІМПОРТ
// import { compose } from "redux";
// import { devToolsEnhancer } from "@redux-devtools/extension";

// // **1️⃣ Персистований редюсер**
// const persistedAuthReducer = persistReducer(
//   {
//     key: "jwt-token",
//     storage,
//     whitelist: ["accessToken", "user", "isLoggedIn"],
//   },
//   authReducer
// );

// // **2️⃣ Middleware для обробки 401 Unauthorized**
// const authMiddleware: Middleware = (store) => (next) => (action) => {
//   if (isRejectedWithValue(action) && action.payload === "Unauthorized") {
//     console.error("Unauthorized, logging out...");
//     localStorage.removeItem("token");

//     const dispatch = store.dispatch as AppDispatch;
//     // dispatch(logOut()); // ❌ ЗАКОМЕНТОВАНО ДЛЯ ТЕСТУ
//     window.location.href = "/";
//   }
//   return next(action);
// };

// // **3️⃣ Створення Store**
// export const store = configureStore({
//   reducer: {
//     campers: tasksReducerCard,
//     filters: filtersReducer,
//     auth: persistedAuthReducer,
//     language: languageReducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         ignoredPaths: ["auth.token", "auth.user"],
//       },
//       immutableCheck: {
//         warnAfter: 64,
//       },
//     }).concat(authMiddleware), //  Додаємо middleware КОРЕКТНО
//   enhancers: [compose(devToolsEnhancer())], // Виправлено `composeWithDevTools`
// });

// // **4️⃣ Персистор**
// export const persistor = persistStore(store);

// // **5️⃣ Типізація**
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



// import { configureStore } from "@reduxjs/toolkit";
// import tasksReducerCard from "./campers/slice";
// import { filtersReducer } from "./filters/slice";
// import languageReducer from "./sliceLanguage";
// import { authReducer } from "./auth/slice";
// import storage from "redux-persist/lib/storage";
// import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "@redux-devtools/extension";


// import {
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   persistReducer,
// } from "redux-persist";
// // import { logOut } from "./auth/operations";

// const persistedToken = localStorage.getItem("token");
// console.log("🔍 LOADED TOKEN FROM STORAGE (before persist):", persistedToken);


// const persistedAuthReducer = persistReducer(
//   {
//     key: "jwt-token",
//     storage,
//     whitelist: ["accessToken", "user", "isLoggedIn"],
//   },
//   authReducer
// );

// const authMiddleware: Middleware = (store) => (next) => (action) => {
//   if (isRejectedWithValue(action) && action.payload === "Unauthorized") {
//     console.error("Unauthorized, logging out...");
//     localStorage.removeItem("token");
//     const dispatch = store.dispatch as AppDispatch; // Оголошуємо dispatch із правильним типом
//     // dispatch(logOut());
//     window.location.href = "/";
//   }
//   return next(action);
// };


// export const store = configureStore({
//   reducer: {
//     campers: tasksReducerCard,
//     filters: filtersReducer,
//     auth: persistedAuthReducer,
//     language: languageReducer, // Додаємо в Redux in sliceLanguage-translate
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         ignoredPaths: ["auth.token", "auth.user"], // Додав ігнорування шляхів, які персистяться
//       },
//       immutableCheck: {
//         warnAfter: 64, 
//       },
//     })
//       // .concat(authMiddleware), // Додаємо authMiddleware у ланцюжок,
//   enhancers: [composeWithDevTools()], // ✅ Додаємо Redux DevTools
// });
// // Додаємо тип для глобального стану (що необхідно для простішої типізації на TypeScript)
// export type RootState = ReturnType<typeof store.getState>;
// export const persistor = persistStore(store);
// // Визначаємо тип AppDispatch
// export type AppDispatch = typeof store.dispatch;


// TypeScript підкреслює код, бо action має узагальнений тип unknown, і він не знає, чи є в ньому
// Використав isRejectedWithValue(action) — це вбудована утиліта @reduxjs/toolkit, яка перевіряє, чи action є rejected.
// TypeScript не може автоматично визначити, що store.dispatch підтримує AsyncThunk.
// store.dispatch за замовчуванням має загальний тип Dispatch<AnyAction>, і він не знає про logOut().
// Ми явно приводимо store.dispatch до AppDispatch, який уже містить всі типізовані thunks.

// email
// :
// "litvinAl1978aleks@gmail.com"
// name
// :
// "Aleksandr"
// password
// :
// "Al123LitV"


// email
// : 
// "Alina.litvine1234.LenaOl1552@gmail.com"
// name
// : 
// "Anna"
// password
// : 
// "1234Olenjkghj565"