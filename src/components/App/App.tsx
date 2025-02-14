import { Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
// import { selectIsLoggedIn, selectIsRefreshing } from "../../redux/auth/selectors";
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
import { useDispatch, useSelector } from "react-redux";
import { logOut, refreshUser } from "../../redux/auth/operations";
import { AppDispatch, RootState } from "../../redux/store";

export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
  console.log("isLoggedIn:", isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token); // Додаємо перевірку токену
  
  useEffect(() => {
  
  if (!token) {
    console.warn("No token found. Skipping refreshUser.");
    return;
  }
  if (!isLoggedIn) {
    dispatch(refreshUser()).unwrap().catch((error) => {
      if (error === "Unauthorized") {
        dispatch(logOut());
        navigate("/register");
      }
    });
  }
}, [token, isLoggedIn, dispatch, navigate]);

  return ( 
    <Layout>
      <Suspense fallback={<b>Loading...</b>}>
        <Routes>
          <Route path="/" element={<HomePage />} />  
          
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
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

//  <Route path="/" element={<HomePage />} />

// <Route path="/" element={<HomePage />}>
 
//           </Route>
  
            

/* <Route path="/" element={<HomePage />} /> */
//  <Route path="/catalog" element={<TruckPageFilters />} />
// component — це React-компонент, який буде відображатись, якщо користувач не залогінений (наприклад, <LoginPage />).

// <Route
//             path="/register"
//             element={
//               <RestrictedRoute
//                 redirectTo="/catalog"
//                 component={<RegistrationPage />}
//               />
//             }
//           />
          
//           <Route
//             path="/login"
//             element={
//               <RestrictedRoute
//                 redirectTo="/catalog"
//                 component={<LoginPage />}
//               />
//             }
//           />

/* <Route
            path="/catalog"
            element={
              <PrivateRoute
                redirectTo="/"
                component={<TruckPageFilters />}
              />
            }
          /> */