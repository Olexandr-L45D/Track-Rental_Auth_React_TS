import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Використовуємо бекенд для завантаження перекладів
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Мова за замовчуванням
    debug: true,
    interpolation: {
      escapeValue: false, // React автоматично екранує значення
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Шлях до файлів перекладу
    },
  });

export default i18n;

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import HttpApi from "i18next-http-backend";

// const translateText = async (text, targetLanguage) => {
//   if (!text || text.trim() === "") {
//     console.warn("Немає тексту для перекладу");
//     return text;
//   }

//   // Додаємо перевірку на наявність спецсимволів (email, числа, ім'я без пробілів)
//   if (
//     text.includes("@") ||
//     /^\d+$/.test(text) ||
//     text.split(" ").length === 1
//   ) {
//     console.warn("Можливо, це ім'я, число, email. Пропускаємо переклад.");
//     return text;
//   }

//   try {
//     const response = await fetch(
//       `https://lingva.ml/api/v1/translate/en/${targetLanguage}/${encodeURIComponent(
//         text
//       )}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP помилка! Статус: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data || !data.translation) {
//       console.error("Помилка перекладу: некоректні дані від API", data);
//       return text;
//     }

//     return data.translation;
//   } catch (error) {
//     console.error("Помилка запиту:", error);
//     return text;
//   }
// };

// // Ти можеш додати новий бекенд, який буде перекладати тексти за допомогою API

// i18n
//   .use(HttpApi)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "en",
//     debug: true,
//     interpolation: {
//       escapeValue: false,
//     },
//     backend: {
//       loadPath: "/locales/{{lng}}/translation.json",
//     },
//     saveMissing: true, // Дозволяє обробку відсутніх ключів
//     missingKeyHandler: async function (lng, ns, key) {
//       console.warn(
//         `Переклад відсутній для ключа: "${key}" у мові "${lng}". Використовуємо API.`
//       );
//       try {
//         const translatedValue = await translateText(key, lng);
//         return translatedValue; // Використовуємо переклад із зовнішнього API
//       } catch (error) {
//         console.error("Помилка під час отримання перекладу:", error);
//         return key; // Повертаємо ключ як fallback
//       }
//     },
//   });

// export default i18n;
