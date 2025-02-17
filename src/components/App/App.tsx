import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const AuthorizationAuthenticPage = lazy(() =>
  import("../../pages/AuthorizationAuthenticPage/AuthorizationAuthenticPage")
);
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
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logOut, refreshUser } from "../../redux/auth/operations";
import { AppDispatch, RootState } from "../../redux/store";

export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing, shallowEqual);
  console.log("isLoggedIn:", isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token); // Додаємо перевірку токену
 
 const firstRender = useRef(true);

useEffect(() => {
  if (firstRender.current) {
    firstRender.current = false;
    return;
  }
  console.log("Effect triggered with token:", token, "isLoggedIn:", isLoggedIn);
  if (!token) {
    console.warn("No token found. Redirecting to /register...");
    navigate("/register", { replace: true });
    return;
  }
  if (!isLoggedIn && !isRefreshing) {  // Додаємо умову isRefreshing
    dispatch(refreshUser())
      .unwrap()
      .catch((error) => {
        console.error("Error refreshing user:", error);
        if (error === "Unauthorized") {
          dispatch(logOut());
          navigate("/register", { replace: true });
        }
      });
  }
}, [token, isLoggedIn, isRefreshing, dispatch, navigate]);
 
  return ( 
    <Layout>
      <Suspense fallback={<b>Loading...</b>}>
        <Routes>
           {/* Якщо користувач залогінений → ведемо його в каталог */}
          <Route path="/" element={isLoggedIn ? <TruckPageFilters /> : <HomePage />} />

          {/* Автоматичне перенаправлення на реєстрацію, якщо користувач не має токена */}
          {!isLoggedIn && <Route path="/login" element={<Navigate to="/register" />} />}
          
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
};

       

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

// sendResetEmail and resetPassword
          
//   useEffect(() => {
//   console.log("Effect triggered with token:", token, "isLoggedIn:", isLoggedIn);

//   if (!token) {
//     console.warn("No token found. Redirecting to /register...");
//     navigate("/register", { replace: true });
//     return;
//   }

//   if (!isLoggedIn) {
//     dispatch(refreshUser())
//       .unwrap()
//       .catch((error) => {
//         console.error("Error refreshing user:", error);
//         if (error === "Unauthorized") {
//           dispatch(logOut());
//           navigate("/register", { replace: true });
//         }
//       });
//   }
// }, [token, isLoggedIn, dispatch, navigate]);


//   useEffect(() => {
  
//   if (!token) {
//     console.warn("No token found. Skipping refreshUser.");
//     return;
//   }
//   if (!isLoggedIn) {
//     dispatch(refreshUser()).unwrap().catch((error) => {
//       if (error === "Unauthorized") {
//         dispatch(logOut());
//         navigate("/register");
//       }
//     });
//   }
// }, [token, isLoggedIn, dispatch, navigate]);


// реальні данні до Олениної пошти: {
//   "name": "Olenushka",
//   "email": "litvinenko.alena1502@gmail.com",
//   "password": "1234OlenaLi"
// }
