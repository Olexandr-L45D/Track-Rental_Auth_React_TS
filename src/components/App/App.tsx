import { Routes, Route, useNavigate, Navigate, Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const TruckFeatures = lazy(() => import("../TruckFeatures/TruckFeatures"));
const TruckReviews = lazy(() => import("../TruckReviews/TruckReviews"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const TruckPageFilters = lazy(() => import("../../pages/TruckPageFilters/TruckPageFilters"));
const TruckDetalsPage = lazy(() => import("../../pages/TruckDetalsPage/TruckDetalsPage"));
const SendResetEmailPage = lazy(() => import("../../pages/SendResetEmailPage/SendResetEmailPage"));
const ResetPasswordPage = lazy(() => import("../../pages/ResetPasswordPage/ResetPasswordPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

import { Layout } from "../Layout/Layout";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logIn, logOut, refreshUser, setAuthHeader } from "../../redux/auth/operations";
import { AppDispatch, RootState } from "../../redux/store";
import { setToken } from "../../redux/auth/slice";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";


export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const location = useLocation(); // Отримуємо поточний шлях
  
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
    //  Якщо залогінений і не рефрешиться, але ми вже НЕ на `/catalog/:id`, перенаправляємо але якщо вде на АЙДІ то залишаю
  if (isLoggedIn && !isRefreshing && !location.pathname.startsWith("/catalog/")) {
    console.log("🚀 User is logged in! Navigating to /catalog");
    navigate("/catalog", { replace: true });
  }
  }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);
  
  return isRefreshing ? (
    <b>Refreshing user ...</b>
  ) : (
    <Layout>
      <Suspense fallback={<b>Loading...</b>}>
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<HomePage />} />

          {/* Захищені маршрути */}
            <Route path="/catalog" element={<PrivateRoute redirectTo="/login" component={() => <TruckPageFilters />} />} />
          <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={() => <TruckDetalsPage />} />}>

          {/* <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={<TruckDetalsPage />} />}> */}
            <Route path="features" element={<TruckFeatures />} />
            <Route path="reviews" element={<TruckReviews />} />
          </Route>

          {/* Доступні тільки для НЕ залогінених */}
          <Route path="/register" element={<RestrictedRoute redirectTo="/catalog" component={<RegisterPage />} />} />
          <Route path="/login" element={<RestrictedRoute redirectTo="/catalog" component={<LoginPage />} />}/>

          {/* Форми скидання пароля */}
          <Route path="/send-reset-email" element={<RestrictedRoute redirectTo="/catalog" component={<SendResetEmailPage />} />} />
          <Route path="/reset-pwd" element={<RestrictedRoute redirectTo="/catalog" component={<ResetPasswordPage />} />} />

          {/* Сторінка 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};


          // <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={<TruckDetalsPage />} />} />
          //   <Route path="features" element={<TruckFeatures />} />
          //  <Route path="reviews" element={<TruckReviews />} />
          // </Route>