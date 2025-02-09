import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
// import { refreshUser } from "../../redux/auth/operations";
import RestrictedRoute from "../RestrictedRoute";
// import PrivateRoute from "../../components/PrivateRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors";
const TruckFeatures = lazy(() => import("../TruckFeatures/TruckFeatures"));
const TruckReviews = lazy(() => import("../TruckReviews/TruckReviews"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

const TruckPageFilters = lazy(() =>
  import("../../pages/TruckPageFilters/TruckPageFilters")
);
const TruckDetalsPage = lazy(() =>
  import("../../pages/TruckDetalsPage/TruckDetalsPage")
);
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

import { Layout } from "../Layout/Layout";
// import { useDispatch, useSelector } from "react-redux";

export default function App() {
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);
  // запит на ТОКЕН isRefreshing (чи валідний токен?)
  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  // return isRefreshing ? (
  //   <b>Refreshing user ...</b>
  // ) : (
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/catalog"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/catalog"
                component={<LoginPage />}
              />
            }
          />
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
};
