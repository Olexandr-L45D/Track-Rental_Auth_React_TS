import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy: {
      '/users': {
        target: 'https://connections-api.goit.global',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,  // Без заміни
        // rewrite: (path) => path.replace(/^\/users/, '/users'),
      },
    },
  },
  build: {
    sourcemap: mode === 'development',  // Увімкнено тільки для розробки
  },
}));

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