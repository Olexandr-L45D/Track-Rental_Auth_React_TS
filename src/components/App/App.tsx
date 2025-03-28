import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(
  () => import("../../pages/RegisterPage/RegisterPage")
);
const TruckFeatures = lazy(() => import("../TruckFeatures/TruckFeatures"));
const TruckReviews = lazy(() => import("../TruckReviews/TruckReviews"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const TruckPageFilters = lazy(
  () => import("../../pages/TruckPageFilters/TruckPageFilters")
);
const TruckDetalsPage = lazy(
  () => import("../../pages/TruckDetalsPage/TruckDetalsPage")
);
const SendEmailConfirmationPage = lazy(
  () =>
    import("../../pages/SendEmailConfirmationPage/SendEmailConfirmationPage")
);
const ResetPasswordPage = lazy(
  () => import("../../pages/ResetPasswordPage/ResetPasswordPage")
);
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const GoogleRedirectHandler = lazy(
  () => import("../../pages/GoogleRedirectHandler")
);
const TruckPageImages = lazy(
  () => import("../../pages/TruckPageImages/TruckPageImages")
);

import { Layout } from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../redux/store";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import Loader from "../Loader/Loader";
import { refreshSessionUser, refreshUser } from "../../redux/auth/operations";

// Оголошуємо тип для window, додаючи redirected щоб далі з ним працювати і дізнаватись стан Додаю на початку файлу, щоб TypeScript знав, що ми працюємо з DOM.
/// <reference lib="dom" />
declare global {
  interface Window {
    redirected?: boolean;
  }
}

export default function App() {
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isRefreshing = useSelector(
    (state: RootState) => state.auth.isRefreshing
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const location = useLocation();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<TruckPageImages />} />

          {/* Доступні тільки для НЕ залогінених */}
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/catalog" component={RegisterPage} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/catalog" component={LoginPage} />
            }
          />

          {/* Форми скидання пароля */}
          <Route
            path="/confirm-email/:token"
            element={
              <RestrictedRoute
                component={SendEmailConfirmationPage}
                redirectTo="/catalog"
              />
            }
          />

          <Route
            path="/reset-pwd"
            element={
              <RestrictedRoute
                redirectTo="/catalog"
                component={ResetPasswordPage}
              />
            }
          />

          <Route path="/confirm-oauth" element={<GoogleRedirectHandler />} />

          {/* <Route
            path="/confirm-oauth"
            element={
              <RestrictedRoute
                component={GoogleRedirectHandler}
                redirectTo="/catalog"
              />
            }
          /> */}

          {/* Захищені маршрути */}
          <Route
            path="/catalog"
            element={
              <PrivateRoute redirectTo="/login" component={TruckPageFilters} />
            }
          />
          <Route
            path="/catalog/:id"
            element={
              <PrivateRoute redirectTo="/login" component={TruckDetalsPage} />
            }
          >
            <Route path="features" element={<TruckFeatures />} />
            <Route path="reviews" element={<TruckReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
