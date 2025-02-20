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
import { logIn, logOut, refreshUser, setAuthHeader } from "../../redux/auth/operations";
import { AppDispatch, RootState } from "../../redux/store";
import LoginForm from "../LoginForm/LoginForm";
import { setToken } from "../../redux/auth/slice";


export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const firstRender = useRef(true);
 

  useEffect(() => {
  console.log("🟢 useEffect TRIGGERED");

  const savedToken = localStorage.getItem("jwt-token");

  if (savedToken && !accessToken) {
    console.log("📦 Loaded token from LocalStorage:", savedToken);
    dispatch(setToken({ accessToken: savedToken, user }));
  }

  if (accessToken) {
    console.log("📦 Saving token to LocalStorage:", accessToken);
    localStorage.setItem("jwt-token", accessToken);
  }

  if (!accessToken && !isRefreshing) {
    console.warn("❌ No token found. Redirecting to /register...");
    navigate("/register", { replace: true });
    return;
  }

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
    // 🔥 Якщо залогінений і не рефрешиться, перенаправляємо на каталог
  if (isLoggedIn && !isRefreshing) {
    console.log("🚀 User is logged in! Navigating to /catalog");
    navigate("/catalog", { replace: true });
  }
}, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate]);

  return isRefreshing ? (<b>Refreshing user ...</b>) : (
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

