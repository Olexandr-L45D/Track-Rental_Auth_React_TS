import i18n from "i18next"; 
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Використання бекенду для завантаження перекладів
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem('i18nextLng') || 'en', // Збереження мови
    debug: false,
    interpolation: {
      escapeValue: false, // React автоматично екранує значення
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Шлях до файлів перекладу
    },
    react: {
      useSuspense: false, // Уникнення зависань
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng); // Збереження мови в localStorage
});

export default i18n;
