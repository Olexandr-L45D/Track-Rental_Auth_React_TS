import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import "../i18n"; 
import App from "./components/App/App";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading translations...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
