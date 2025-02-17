import { Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
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
import { logOut, refreshUser } from "../../redux/auth/operations";
import { AppDispatch, RootState } from "../../redux/store";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import PrivateRoute from "../PrivateRoute";
import AuthLayout from "../AuthLayout";


export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing, shallowEqual);
  const token = useSelector((state: RootState) => state.auth.token);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!token) {
      console.warn("No token found. Redirecting to /register...");
      navigate("/register", { replace: true });
      return;
    }

    if (!isLoggedIn && !isRefreshing) {
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
  {!isLoggedIn ? (
    <>
      
      <Route path="/" element={<AuthLayout />}>
        <Route path="register" element={<AuthorizationAuthenticPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="send-reset-email" element={<SendResetEmailForm />} />
        <Route path="reset-pwd" element={<ResetPasswordForm />} />
      </Route>

      {/*  Редірект з /login на /register */}
      <Route path="/login" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Navigate to="/register" />} />
    </>
  ) : (
    <>
      <Route element={<PrivateRoute redirectTo="/register" />}>
        <Route path="/" element={<TruckPageFilters />} />
        <Route path="/catalog" element={<TruckPageFilters />} />
        <Route path="/catalog/:id" element={<TruckDetalsPage />}>
          <Route path="features" element={<TruckFeatures />} />
          <Route path="reviews" element={<TruckReviews />} />
        </Route>
      </Route>
    </>
  )}

  <Route path="*" element={<NotFoundPage />} />
</Routes>

      </Suspense>
    </Layout>
  );
}



        // {/* <Routes>
        //   {/* Маршрути для неавторизованих користувачів */}
        //   {!isLoggedIn ? (
            
        //       <Route path="/auth" element={<AuthLayout />}>
        //       <Route index element={<AuthorizationAuthenticPage />} />
        //       <Route path="register" element={<RegistrationForm />} />
        //       <Route path="login" element={<LoginPage />} />
        //       <Route index element={<AuthorizationAuthentic />} />
        //       <Route path="send-reset-email" element={<SendResetEmailForm />} />
        //       <Route path="reset-pwd" element={<ResetPasswordForm />} />
                
        //       </Route>
          
        //   ) : (
        //     <>
        //       {/* Приватні маршрути, доступні тільки авторизованим користувачам */}
        //       <Route path="/" element={<PrivateRoute component={<TruckPageFilters />} redirectTo="/auth/register" />} />
        //       <Route path="/catalog" element={<PrivateRoute component={<TruckPageFilters />} redirectTo="/auth/register" />} />
        //       <Route path="/catalog/:id" element={<PrivateRoute component={<TruckDetalsPage />} redirectTo="/auth/register" />}>
        //         <Route path="features" element={<TruckFeatures />} />
        //         <Route path="reviews" element={<TruckReviews />} />
        //       </Route>
        //       <Route path="*" element={<NotFoundPage />} />
        //     </>
        //   )}
        // </Routes> */}
// <Route path="/auth" element={<AuthLayout />}>
              // <Route index element={<AuthorizationAuthenticPage />} />
              // <Route path="register" element={<RegistrationForm />} />
              // <Route path="login" element={<LoginPage />} />
              // <Route index element={<AuthorizationAuthentic />} />
              // <Route path="send-reset-email" element={<SendResetEmailForm />} />
              // <Route path="reset-pwd" element={<ResetPasswordForm />} />
//             </Route>


 
                //   {!isLoggedIn && <Route path="/login" element={<Navigate to="/register" />} />}
                //   <Route path="/auth" element={<AuthorizationAuthenticPage />} />
                //   {/* <Route path="/register" element={<RegistrationForm />} /> */}
                //   <Route path="/login" element={<LoginPage />} />
                //   <Route path="/auth" element={<AuthorizationAuthentic />} />
                //   <Route path="/send-reset-email" element={<SendResetEmailForm />} />
                // <Route path="/reset-pwd" element={<ResetPasswordForm />} />  

// export default function App() {
//   const dispatch: AppDispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
//   const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing, shallowEqual);
//   console.log("isLoggedIn:", isLoggedIn);
//   const token = useSelector((state: RootState) => state.auth.token); // Додаємо перевірку токену
//  const firstRender = useRef(true);

// useEffect(() => {
//   if (firstRender.current) {
//     firstRender.current = false;
//     return;
//   }
//   console.log("Effect triggered with token:", token, "isLoggedIn:", isLoggedIn);
//   if (!token) {
//     console.warn("No token found. Redirecting to /register...");
//     navigate("/register", { replace: true });
//     return;
//   }
//   if (!isLoggedIn && !isRefreshing) {  // Додаємо умову isRefreshing
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
// }, [token, isLoggedIn, isRefreshing, dispatch, navigate]);
 
//   return ( 
//     <Layout>
//       <Suspense fallback={<b>Loading...</b>}> 
//                <Routes>
//           {!isLoggedIn ? (
//           <Route path="/auth" element={<AuthLayout />}>
//              <Route index element={<AuthorizationAuthenticPage />} />
//              <Route path="register" element={<RegistrationForm />} />
//              <Route path="login" element={<LoginPage />} />
//              <Route path="send-reset-email" element={<SendResetEmailForm />} />
//              <Route path="reset-pwd" element={<ResetPasswordForm />} />
//            </Route>
          
//         ) : (
//        <>
//           <Route path="/" element={isLoggedIn ? <TruckPageFilters /> : <HomePage />} />
//             <Route path="/catalog" element={<TruckPageFilters />} />        
//             <Route path="/catalog/:id" element={<TruckDetalsPage />}>
//             <Route path="features" element={<TruckFeatures />} />
//             <Route path="reviews" element={<TruckReviews />} />
//           </Route>
//           <Route path="*" element={<NotFoundPage />} />
//       </>
//       )}
//       </Routes>
//       </Suspense>
//     </Layout>
//   );
// };

     

//   <Route path="/auth" element={<AuthLayout />}>
          //     <Route path="login" element={<LoginPage />} />
          //     <Route path="/register" element={<AuthorizationAuthenticPage />} />
          //     <Route index element={<AuthorizationAuthentic />} />
          //     <Route path="send-reset-email" element={<SendResetEmailForm />} />
          //     <Route path="reset-pwd" element={<ResetPasswordForm />} />
          // </Route>
/* <Route index element={<AuthorizationAuthenticPage />} /> означає, що коли користувач переходить на / auth без уточнення шляху(наприклад, /auth/login), /
  // буде рендеритись компонент AuthorizationAuthenticPage за замовчуванням.

              /* <Route path="login" element={<AuthorizationAuthenticPage />} />
              <Route path="register" element={<AuthorizationAuthenticPage />} />
              <Route path="send-reset-email" element={<SendResetEmailForm/>} />
              <Route path="reset-pwd" element={<ResetPasswordForm />} /> */

  // <Routes>
  //          {/* Якщо користувач залогінений → ведемо його в каталог */}
  //         <Route path="/" element={isLoggedIn ? <TruckPageFilters /> : <HomePage />} />
  //         {/* Автоматичне перенаправлення на реєстрацію, якщо користувач не має токена */}
        

  //         {!isLoggedIn && <Route path="/login" element={<Navigate to="/register" />} />}
      
  //         <Route path="/auth" element={<AuthorizationAuthentic />} />
  //         <Route path="/register" element={<AuthorizationAuthenticPage />} />
          
  //         <Route path="/catalog" element={<TruckPageFilters />} />
                    
  //         <Route path="/catalog/:id" element={<TruckDetalsPage />}>
  //           <Route path="features" element={<TruckFeatures />} />
  //           <Route path="reviews" element={<TruckReviews />} />
  //         </Route>
          
  //         <Route path="*" element={<NotFoundPage />} />
  //       </Routes> 

          //  {/* Якщо користувач не залогінений → ведемо його в компоенет з формами AuthorizationAuthentic  → 
          //          Але потрібно лише при натисканні на кнопку (ResEmeilPass) в Хедері в компоненті (Navigation) - веде в - SendResetEmailForm та ResetPasswordForm */}
          // {/* Відновлення паролю (Доступно лише для неавторизованих) */}
          //  {!isLoggedIn && (
          //    <>
          //      <Route path="/auth/send-reset-email" element={<SendResetEmailForm />} />
          //      <Route path="/auth/reset-pwd" element={<ResetPasswordForm />} />
          //    </>
          //  )}

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
