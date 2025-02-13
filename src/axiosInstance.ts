import axios from "axios";
import { store } from "./redux/store";
import { logOut } from "./redux/auth/operations";

export const axiosInstanceUser = axios.create({
  baseURL: "https://connections-api.goit.global",
});

// Глобальна обробка 401 (Unauthorized)
axiosInstanceUser.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, logging out...");

      localStorage.removeItem("token");
      store.dispatch(logOut()); // Диспатчимо вихід
      window.location.href = "/"; // Перекидаємо на головну
    }
    return Promise.reject(error);
  }
);
