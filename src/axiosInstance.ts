import axios from "axios";

export const axiosInstanceUser = axios.create({
  baseURL: "https://nodejs-hw-mongodb-auth-syz8.onrender.com",
  withCredentials: true, // ✅ Дозволяє кукі та заголовки CORS
});

//  новий УРЛ з нового сервіса - railway: nodejs-hw-mongodb-production.up.railway.app
axios.defaults.withCredentials = true;

// Глобальна обробка 401 (Unauthorized)
axiosInstanceUser.interceptors.response.use(
  response => response,
  error => {
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
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, logging out...");

      localStorage.removeItem("token");
      window.location.href = "/"; // Перекидаємо на головну
    }
    return Promise.reject(error);
  }
);
