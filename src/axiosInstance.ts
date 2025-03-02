import axios from "axios";
//axiosInstanceUser - to USER -Bec  прибираю імпорт стору та прибираю діспатч з логаут
// export const axiosInstanceUser = axios.create({
//   baseURL: "https://connections-api.goit.global",
// });
export const axiosInstanceUser = axios.create({
  baseURL: "https://nodejs-hw-mongodb-auth-syz8.onrender.com",
  withCredentials: true, // ✅ Дозволяє кукі та заголовки CORS
});

// baseURL: "https://nodejs-hw-mongodb-auth-syz8.onrender.com",
//  новий УРЛ з нового сервіса - railway: nodejs-hw-mongodb-production.up.railway.app
axios.defaults.withCredentials = true;

// Глобальна обробка 401 (Unauthorized)
axiosInstanceUser.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, logging out...");

      localStorage.removeItem("token");
      
      window.location.href = "/"; // Перекидаємо на головну
    }
    return Promise.reject(error);
  }
);

const axiosInstanceTruksOperations = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io", // Тут базовий URL для отримання даних TRUCK-Auto
});

// 2. Обробляємо помилки у відповіді
axiosInstanceTruksOperations.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, logging out...");

      localStorage.removeItem("token");
      window.location.href = "/"; // Перекидаємо на головну
    }
    return Promise.reject(error);
  }
);


// const axiosInstanceTruksOperations = axios.create({
//   baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io", // Тут базовий URL для отримання даних TRUCK-Auto
// });
// axiosInstanceTruksOperations.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });



// Тепер він лише очищає localStorage і перекидає на /, а Redux займається виходом Якщо Юзер не авторизован - 401 еррор!!!.

// import axios from "axios";
// import { store } from "./redux/store";
// //  МІНЯЮ на відкладене виконання за рахунок СЕТТАЙМАУТ
// import { logOut } from "./redux/auth/operations";

// export const axiosInstanceUser = axios.create({
//   baseURL: "https://connections-api.goit.global",
// });

// baseURL: "https://nodejs-hw-mongodb-6-1-xj46.onrender.com",

// // Глобальна обробка 401 (Unauthorized)
// axiosInstanceUser.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("Unauthorized, logging out...");

//       localStorage.removeItem("token");
//       store.dispatch(logOut()); // Диспатчимо вихід
//       window.location.href = "/"; // Перекидаємо на головну
//     }
//     return Promise.reject(error);
//   }
// );
