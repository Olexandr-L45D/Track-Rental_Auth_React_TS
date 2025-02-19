import { Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
// const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const AuthorizationAuthenticPage = lazy(() => import("../../pages/AuthorizationAuthenticPage/AuthorizationAuthenticPage"));
const TruckFeatures = lazy(() => import("../TruckFeatures/TruckFeatures"));
const TruckReviews = lazy(() => import("../TruckReviews/TruckReviews"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const TruckPageFilters = lazy(() => import("../../pages/TruckPageFilters/TruckPageFilters"));
const TruckDetalsPage = lazy(() => import("../../pages/TruckDetalsPage/TruckDetalsPage"));
const AuthorizationAuthentic = lazy(() => import("../AuthorizationAuthentic/AuthorizationAuthentic"));
const SendResetEmailForm = lazy(() => import("../SendResetEmailForm/SendResetEmailForm"));
const ResetPasswordForm = lazy(() => import("../ResetPasswordForm/ResetPasswordForm"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

import { Layout } from "../Layout/Layout";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logIn, logOut, refreshUser } from "../../redux/auth/operations";
import { AppDispatch, RootState } from "../../redux/store";
import LoginForm from "../LoginForm/LoginForm";
import { setToken } from "../../redux/auth/slice";


export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
  // const token = useSelector((state: RootState) => state.auth.token);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const firstRender = useRef(true);
 
  console.log("🔍 TOKEN FROM REDUX (after useSelector):", accessToken);
  
  useEffect(() => {
  console.log("🟢 useEffect TRIGGERED");

  // 1️⃣ Завантажуємо токен із localStorage при першому рендері (якщо його ще немає в Redux)
  if (!accessToken) {
    const savedToken = localStorage.getItem("jwt-token");
    if (savedToken) {
      console.log("📦 Loaded token from LocalStorage:", savedToken);
      dispatch(setToken(savedToken)); // Додай цей action у slice
    }
  }

  // 2️⃣ Зберігаємо токен у localStorage при зміні
  if (accessToken) {
    console.log("📦 Saving token to LocalStorage:", accessToken);
    localStorage.setItem("jwt-token", accessToken);
  }

  // 3️⃣ Якщо токена немає, перекидаємо на /register
  if (!accessToken) {
    console.warn("❌ No token found. Redirecting to /register...");
    navigate("/register", { replace: true });
    return;
  }

  // 4️⃣ Викликаємо refreshUser(), якщо не залогінений і немає активного рефрешу
  if (!isLoggedIn && !isRefreshing) {
    console.log("🔄 Dispatching refreshUser...");
    dispatch(refreshUser())
      .unwrap()
      .catch((error) => {
        console.error("❌ Error refreshing user:", error);
        if (error === "Unauthorized") {
          navigate("/register", { replace: true });
        }
      });
  }
}, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate]);

 
  return (
    <Layout>
      <Suspense fallback={<b>Loading...</b>}>
        <Routes>
          {/* Якщо залогінений → Каталог, якщо ні → Головна */}
          <Route path="/" element={isLoggedIn ? <TruckPageFilters /> : <HomePage />} />

          {/* Редірект з логіну на реєстрацію */}
          {!isLoggedIn && <Route path="/login" element={<Navigate to="/register" />} />}

          {/* Модалка для авторизації (якщо не залогінений) */}
          {!isLoggedIn && (
            <Route path="/" element={<AuthorizationAuthentic />}>
            
              {/* примінив передачу пропсів до Логінформи так як має рахувати кількість невдалих спроб авторизації */}
              <Route path="login" element={<LoginForm attempts={0} setAttempts={() => {}} />} />

              <Route path="send-reset-email" element={<SendResetEmailForm />} />
              <Route path="reset-pwd" element={<ResetPasswordForm />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          )}

        
          <Route path="/register" element={<AuthorizationAuthenticPage />} />

          <Route path="/catalog" element={<TruckPageFilters />} />
          <Route path="/catalog/:id" element={<TruckDetalsPage />}>
            <Route path="features" element={<TruckFeatures />} />
            <Route path="reviews" element={<TruckReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

