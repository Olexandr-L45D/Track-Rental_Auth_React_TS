import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5173, // Ставимо стандартний порт
  host: true, // Додає підтримку для інших мережевих пристроїв
    // open: true, // Автоматично відкривати браузер прибираю щоб вайт не міг автоматично запустити і Антивірусник не сварився
    proxy: {
      '/users': {
        target: 'https://nodejs-hw-mongodb-6-1-xj46.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
        console.log("Proxying request:", path);
        return path;
        },
        // rewrite: (path) => path,  // Без заміни
        // rewrite: (path) => path.replace(/^\/users/, '/users'),
      },
    },
  },
  build: {
    sourcemap: true,  // Завжди вмикає карти джерел, навіть у продакшн
  },
}));

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173, // Ставимо стандартний порт
//     strictPort: true, // Вимикаємо автоматичний вибір порту
//     open: true, // Автоматично відкривати браузер
//   },
// });


// версія нижче без build: {
//    sourcemap: mode === 'development',  // Увімкнено тільки для розробки
 // },
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/users': {
//         target: 'https://connections-api.goit.global',
//         changeOrigin: true,
//         secure: true,
//         rewrite: (path) => path.replace(/^\/users/, '/users'),
//       },
//     },
//   },
// });

// /users: Проксі перенаправляє всі запити, які починаються з /users, на https://connections-api.goit.global/users.
// changeOrigin: true: Додає правильні заголовки для CORS.
// secure: true: Гарантує, що HTTPS-з'єднання використовується.
// rewrite: Переписує URL, щоб правильно обробляти маршрути.

//  початкові налаштування з конспекту (що на практиці небезпечно )
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: true,
//   }
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

//build: {
//     sourcemap: true,
//   }
// sourcemap: true, = Дозволяє бачити вихідний TypeScript/JSX-код у DevTools:
// сть згенерованого мінімізованого коду ти бачитимеш оригінальні файли.
// Полегшує дебагінг:
// Помилки у браузері будуть вказувати на рядки оригінального коду, а не на скомпільований JS.
// Продакшн:
// Якщо включити це в продакшн-білд, треба бути обережним: це може збільшити розмір білду і потенційно розкрити вихідний код.