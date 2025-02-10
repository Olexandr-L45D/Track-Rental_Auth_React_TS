import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import "../i18n"; 
import App from "./components/App/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading translations...</div>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


// 2. Імпортуємо створений раніше стор, який зберігається в файлі redux/filters/store
// import { store, persistor } from "../src/redux/store";
// import { PersistGate } from "redux-persist/integration/react";
// import {  persistor } from "../src/redux/store";



// Так, додати PersistGate варто, особливо якщо ти використовуєш redux-persist для збереження токена та стану авторизації між сесіями.
// PersistGate забезпечує завантаження збереженого стану перед рендерингом додатку. Це корисно для збереження токенів та статусу авторизації.
// стара версія без авторизаціїї та стану для токенів:
/* <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading translations...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode> */