import { Routes, Route, useNavigate, Navigate, Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const TruckFeatures = lazy(() => import("../TruckFeatures/TruckFeatures"));
const TruckReviews = lazy(() => import("../TruckReviews/TruckReviews"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const TruckPageFilters = lazy(() => import("../../pages/TruckPageFilters/TruckPageFilters"));
const TruckDetalsPage = lazy(() => import("../../pages/TruckDetalsPage/TruckDetalsPage"));
const SendEmailConfirmationPage = lazy(() => import("../../pages/SendEmailConfirmationPage/SendEmailConfirmationPage"));
const ResetPasswordPage = lazy(() => import("../../pages/ResetPasswordPage/ResetPasswordPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const GoogleRedirectHandler = lazy(() =>
  import('../../pages/GoogleRedirectHandler'),
);

import { Layout } from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUser, refreshUser} from "../../redux/auth/operations";
import { AppThunkDispatch, RootState } from "../../redux/store";
import { setToken } from "../../redux/auth/slice";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import Loader from "../Loader/Loader";


export default function App() {
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const location = useLocation();
  const isFirstLogin = useRef(true);

  useEffect(() => {
  console.log("🟢 useEffect TRIGGERED (Token Check)");
  console.log("📌 Поточний маршрут:", location.pathname);
  console.log("📌 isLoggedIn:", isLoggedIn);
  console.log("📌 accessToken:", accessToken);

  const savedToken = localStorage.getItem("jwt-token");
    console.log("📦 Token from LocalStorage:", savedToken);
    if (savedToken && !accessToken) {
    console.log("📦 Loaded token from LocalStorage:", savedToken);
    dispatch(setToken({ accessToken: savedToken, user }));
  }

    if (!isLoggedIn && !isRefreshing) {
      console.log("🚀 Redirecting to login");
      navigate("/login", { replace: true });
    return;
    }
    if (isLoggedIn && isRefreshing) {
      console.log("🚀 Redirecting to login");
      navigate("/catalog", { replace: true });
    return;
  }

}, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);



//   useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Token Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);
//   console.log("📌 accessToken:", accessToken);

//   const savedToken = localStorage.getItem("jwt-token");
//   console.log("📦 Token from LocalStorage:", savedToken);

//   if (!isLoggedIn) {
//     console.log("🚪 User logged out, skipping token restore.");
//     return;
//   }

//   if (savedToken && !accessToken) {
//     console.log("📦 Loaded token from LocalStorage:", savedToken);
//     dispatch(setToken({ accessToken: savedToken, user }));
//   }
// }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);


//   useEffect(() => {
//   console.log("📌 useEffect triggered!");
//   console.log("🔍 isLoggedIn:", isLoggedIn);
//   console.log("🔍 accessToken:", accessToken);
//   console.log("🔍 isRefreshing:", isRefreshing);
//   console.log("🔍 Поточний маршрут:", location.pathname);

//   // 🔴 Перевіряємо, чи юзер не залогінений та не рефрешиться
//   if (!isLoggedIn && !isRefreshing) {
//     if (location.pathname !== "/login") {
//       console.log("🚀 Redirecting to login");
//       navigate("/login", { replace: true });
//     }
//     return;
//   }

//   // 🟢 Якщо юзер залогінений, але не в каталозі – перенаправляємо
//   if (isLoggedIn && !isRefreshing && location.pathname !== "/catalog") {
//     console.log("🚀 Redirecting to catalog");
//     setTimeout(() => navigate("/catalog", { replace: true }), 100); // 👈 Затримка на оновлення Redux
//   }

// }, [isLoggedIn, isRefreshing, location.pathname, navigate]);


  if (isRefreshing) {
    return <Loader />;
  }

  return isRefreshing ? (
    <b>Refreshing user ...</b>
  ) : (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<HomePage />} />

          {/* Захищені маршрути */}
          <Route path="/catalog" element={<PrivateRoute redirectTo="/login" component={() => <TruckPageFilters />} />} />
          <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={() => <TruckDetalsPage />} />} >
            <Route path="features" element={<TruckFeatures />} />
            <Route path="reviews" element={<TruckReviews />} />
          </Route>

          {/* Доступні тільки для НЕ залогінених */}
          <Route path="/register" element={<RestrictedRoute redirectTo="/catalog" component={() => <RegisterPage />} />} />
          <Route path="/login" element={<RestrictedRoute redirectTo="/catalog" component={() => <LoginPage />} />} />

            {/* Форми скидання пароля */}
            <Route
              path="/confirm-email"
              element={
                <RestrictedRoute
                  component={<SendEmailConfirmationPage />}
                  redirectTo="/catalog"
                />
              }
            />
      
            <Route path="/reset-pwd" element={<RestrictedRoute redirectTo="/catalog" component={() => <ResetPasswordPage />} />} />
            <Route
              path="/confirm-oauth"
              element={
                <RestrictedRoute
                  component={<GoogleRedirectHandler />}
                  redirectTo="/catalog"
                />
              }
            />

          {/* Сторінка 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};





  // useEffect(() => {
  //   console.log("🟢 useEffect TRIGGERED (Token Check)");
  //   console.log("📌 Поточний маршрут:", location.pathname);
  //   console.log("📌 isLoggedIn:", isLoggedIn);

  //   if (!isLoggedIn && location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/login") {
  //     console.log("🚀 Redirecting to home page `/`");
  //     navigate("/", { replace: true });
  //     return;
  //   }
  //   // 2️⃣ Якщо юзер залогінений і не рефрешиться, але ще НЕ в каталозі → перекидаємо в каталог 12345Alex
  //   if (isLoggedIn && !isRefreshing && location.pathname !== "/catalog") {
  //     console.log("🚀 User just logged in! Navigating to /catalog");
  //     // ✅ Даємо Redux час оновити стан перед редіректом
  //     navigate("/catalog", { replace: true });
  //   }

  //   const savedToken = localStorage.getItem("jwt-token");

  //   if (!isLoggedIn) {
  //     console.log("🚪 User logged out, skipping token restore.");
  //     return;
  //   }
  //   if (savedToken && !accessToken) {
  //     console.log("📦 Loaded token from LocalStorage:", savedToken);
  //     dispatch(setToken({ accessToken: savedToken, user }));
  //   }

  //       if (savedToken && !accessToken && !isRefreshing) {
  //     console.log("📦 Loaded token from LocalStorage:", savedToken);
  //     dispatch(setToken({ accessToken: savedToken, user }));

  //     console.log("🔄 Dispatching refreshUser...");
  //     dispatch(refreshUser()).then((result) => {
  //       if (refreshUser.rejected.match(result)) {
  //         console.error("❌ Error refreshing user:", result.error);
  //         navigate("/register", { replace: true });
  //       } else {
  //         console.log("✅ Refresh User Result:", result);
  //         dispatch(getUser()); // Отримуємо актуальні дані юзера
  //       }
  //     });
  //   }


  //   if (savedToken && !accessToken) {
  //     console.log("📦 Loaded token from LocalStorage:", savedToken);
  //     dispatch(setToken({ accessToken: savedToken, user }));
  //   }
  //   const fetchUser = async () => {
  // console.log("🔄 Dispatching refreshUser...");
  // try {
  //   const result = await dispatch(refreshUser()); // ✅ Більше не підкреслює
  //   console.log("✅ Refresh User Result:", result);
  //   // Якщо рефреш успішний, підтягуємо актуальні дані юзера
  //   // додав гетузера getUser() - оновлені дані про Юзера
  //     console.log("🔄 Fetching user data...");
  //     await dispatch(getUser());
  // } catch (error) {
  //   console.error("❌ Error refreshing user:", error);
  //   if (error === "Unauthorized") {
  //     navigate("/register", { replace: true });
  //   }
  // }
  //   };
  //   fetchUser();
    

  // }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);


 // return (
  //   <div>
  //     <ToastContainer limit={3} />
  //     <SharedLayout>
  //       <Suspense fallback={<Loader />}>
  //         <Routes>
  //           <Route path="/welcome" element={<WelcomePage />} />
  //           <Route
  //             index
  //             element={
  //               <RestrictedRoute
  //                 redirectTo="/home"
  //                 component={<WelcomePage />}
  //               />
  //             }
  //           />
  //           <Route
  //             path="/signup"
  //             element={
  //               <RestrictedRoute component={<SignupPage />} redirectTo="/" />
  //             }
  //           />
  //           <Route
  //             path="/confirm-email"
  //             element={
  //               <RestrictedRoute
  //                 component={<ConfirmEmailPage />}
  //                 redirectTo="/home"
  //               />
  //             }
  //           />

  //           <Route
  //             path="/signin"
  //             element={
  //               <RestrictedRoute
  //                 component={<SigninPage />}
  //                 redirectTo="/home"
  //               />
  //             }
  //           />
  //           <Route
  //             path="/home"
  //             element={
  //               <PrivateRoute redirectTo="/signin" component={<HomePage />} />
  //             }
  //           />
  //           <Route
  //             path="/reset-pwd"
  //             element={
  //               <RestrictedRoute
  //                 redirectTo="/home"
  //                 component={<PasswordResetPage />}
  //               />
  //             }
  //           />
  //           <Route
  //             path="/googleauth"
  //             element={
  //               <RestrictedRoute
  //                 component={<GoogleRedirectHandler />}
  //                 redirectTo="/home"
  //               />
  //             }
  //           />

  //           <Route path="*" element={<NotFoundPage />} />
  //         </Routes>
  //       </Suspense>
  //     </SharedLayout>
  //   </div>
  // );







    // if (!isLoggedIn && !isRefreshing) {
    //   console.log("🔄 Dispatching refreshUser...");
    //   dispatch(refreshUser())
    //     .unwrap()
    //     .catch((error) => {
    //       console.error("❌ Error refreshing user:", error);
    //       if (error === "Unauthorized") {
    //         navigate("/register", { replace: true });
    //       }
    //     });
    // }




// export default function App() {
//   const dispatch: AppDispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
//   const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
//   const user = useSelector((state: RootState) => state.auth.user);
//   const accessToken = useSelector((state: RootState) => state.auth.accessToken);
//   const location = useLocation(); // Отримуємо поточний шлях
//   const prevIsLoggedIn = useRef(isLoggedIn);
//   const isFirstLogin = useRef(true);

// useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Final Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);
//   console.log("📌 accessToken:", accessToken);

//   if (!isLoggedIn && location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/login") {
//     console.log("🚀 Redirecting to home page `/`");
//     navigate("/", { replace: true });
//   }

//   if (isLoggedIn && location.pathname !== "/catalog") {
//     console.log("🚀 User just logged in! Navigating to /catalog");
//     setTimeout(() => navigate("/catalog", { replace: true }), 100); // ✅ Даємо Redux час оновитись
//   }
//    if (!isRefreshing && isLoggedIn && location.pathname !== "/catalog") {
//     console.log("🚀 User just logged in! Navigating to /catalog");
//     navigate("/catalog", { replace: true });
//   }
// }, [isLoggedIn, isRefreshing, location.pathname]);

  
//   useEffect(() => {
//    console.log("🟢 useEffect TRIGGERED");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);

//     const savedToken = localStorage.getItem("jwt-token");
     
//   if (!isLoggedIn) {  // ✅ Якщо користувач вийшов - не відновлюємо токен
//     console.log("🚪 User logged out, skipping token restore.");
//     return;
//   }

//     if (savedToken && !accessToken) {
//       console.log("📦 Loaded token from LocalStorage:", savedToken);
//       dispatch(setToken({ accessToken: savedToken, user }));
//     }

//     if (accessToken) {
//       console.log("📦 Saving token to LocalStorage:", accessToken);
//       localStorage.setItem("jwt-token", accessToken);
//     }

//     if (!accessToken && !isRefreshing) {
//       console.warn("❌ No token found. Redirecting to /register...");
//       navigate("/register", { replace: true });
//       return;
//     }

    // if (!isLoggedIn && !isRefreshing) {
    //   console.log("🔄 Dispatching refreshUser...");
    //   dispatch(refreshUser())
    //     .unwrap()
    //     .catch((error) => {
    //       console.error("❌ Error refreshing user:", error);
    //       if (error === "Unauthorized") {
    //         navigate("/register", { replace: true });
    //       }
    //     });
    // }
//     //  Якщо залогінений і не рефрешиться, але ми вже НЕ на `/catalog/:id`, перенаправляємо але якщо вде на АЙДІ то залишаю
//   if (isLoggedIn && !isRefreshing && !location.pathname.startsWith("/catalog/")) {
//     console.log("🚀 User is logged in! Navigating to /catalog");
//     navigate("/catalog", { replace: true });
//     }
//     // ✅ Перенаправлення після логіну
//     if (isLoggedIn && !isRefreshing) {
//       if (isFirstLogin.current || prevIsLoggedIn.current !== isLoggedIn) {
//         console.log("🚀 User just logged in! Navigating to /catalog");
//         navigate("/catalog", { replace: true });
//         isFirstLogin.current = false; // Тепер не перезапускаємо зайве
//       }
//     }

//     prevIsLoggedIn.current = isLoggedIn;
//   }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);
  




// export default function App() {
//   const dispatch: AppDispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);
//   const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
//   const user = useSelector((state: RootState) => state.auth.user);
//   const accessToken = useSelector((state: RootState) => state.auth.accessToken);
//   const location = useLocation(); // Отримуємо поточний шлях
  
//   useEffect(() => {
//     console.log("🟢 useEffect TRIGGERED");

//     const savedToken = localStorage.getItem("jwt-token");

//     if (savedToken && !accessToken) {
//       console.log("📦 Loaded token from LocalStorage:", savedToken);
//       dispatch(setToken({ accessToken: savedToken, user }));
//     }

//     if (accessToken) {
//       console.log("📦 Saving token to LocalStorage:", accessToken);
//       localStorage.setItem("jwt-token", accessToken);
//     }

//     if (!accessToken && !isRefreshing) {
//       console.warn("❌ No token found. Redirecting to /register...");
//       navigate("/register", { replace: true });
//       return;
//     }

//     if (!isLoggedIn && !isRefreshing) {
//       console.log("🔄 Dispatching refreshUser...");
//       dispatch(refreshUser())
//         .unwrap()
//         .catch((error) => {
//           console.error("❌ Error refreshing user:", error);
//           if (error === "Unauthorized") {
//             navigate("/register", { replace: true });
//           }
//         });
//     }
//     //  Якщо залогінений і не рефрешиться, але ми вже НЕ на `/catalog/:id`, перенаправляємо але якщо вде на АЙДІ то залишаю
//   if (isLoggedIn && !isRefreshing && !location.pathname.startsWith("/catalog/")) {
//     console.log("🚀 User is logged in! Navigating to /catalog");
//     navigate("/catalog", { replace: true });
//   }
//   }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);
 






//   return isRefreshing ? (
//     <b>Refreshing user ...</b>
//   ) : (
//     <Layout>
//       <Suspense fallback={<b>Loading...</b>}>
//         <Routes>
//           {/* Головна сторінка */}
//           <Route path="/" element={<HomePage />} />

//           {/* Захищені маршрути */}
//             <Route path="/catalog" element={<PrivateRoute redirectTo="/login" component={() => <TruckPageFilters />} />} />
//           <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={() => <TruckDetalsPage />} />}>

//           {/* <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={<TruckDetalsPage />} />}> */}
//             <Route path="features" element={<TruckFeatures />} />
//             <Route path="reviews" element={<TruckReviews />} />
//           </Route>

//           {/* Доступні тільки для НЕ залогінених */}
//           <Route path="/register" element={<RestrictedRoute redirectTo="/catalog" component={<RegisterPage />} />} />
//           <Route path="/login" element={<RestrictedRoute redirectTo="/catalog" component={<LoginPage />} />}/>

//           {/* Форми скидання пароля */}
//           <Route path="/send-reset-email" element={<RestrictedRoute redirectTo="/catalog" component={<SendResetEmailPage />} />} />
//           <Route path="/reset-pwd" element={<RestrictedRoute redirectTo="/catalog" component={<ResetPasswordPage />} />} />

//           {/* Сторінка 404 */}
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Suspense>
//     </Layout>
//   );
// };










          // <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={<TruckDetalsPage />} />} />
          //   <Route path="features" element={<TruckFeatures />} />
          //  <Route path="reviews" element={<TruckReviews />} />
// </Route>
          

// {/* Головна сторінка */}
//           <Route path="/" element={<HomePage />} />

//           {/* Захищені маршрути */}
//             <Route path="/catalog" element={<PrivateRoute redirectTo="/login" component={() => <TruckPageFilters />} />} />
//           <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={() => <TruckDetalsPage />} />}>

//           {/* <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={<TruckDetalsPage />} />}> */}
//             <Route path="features" element={<TruckFeatures />} />
//             <Route path="reviews" element={<TruckReviews />} />
//           </Route>
//           {/* Головна сторінка */}
//           <Route path="/" element={<HomePage />} />

//             <Route path="/catalog" element={<TruckPageFilters />} />} />
//           <Route path="/catalog/:id" element={<TruckDetalsPage />} />}>

//           {/* <Route path="/catalog/:id" element={<PrivateRoute redirectTo="/login" component={<TruckDetalsPage />} />}> */}
//             <Route path="features" element={<TruckFeatures />} />
//             <Route path="reviews" element={<TruckReviews />} />
//           </Route>



// useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Token Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);

//   const savedToken = localStorage.getItem("jwt-token");

//   if (!isLoggedIn) {
//     console.log("🚪 User logged out, skipping token restore.");
//     return;
//   }

//   if (savedToken && !accessToken) {
//     console.log("📦 Loaded token from LocalStorage:", savedToken);
//     dispatch(setToken({ accessToken: savedToken, user }));
//   }

//   const fetchUserData = async () => {
//     console.log("🔄 Dispatching refreshUser...");
//     try {
//       const refreshResult = await dispatch(refreshUser()).unwrap();
//       console.log("✅ Refresh User Result:", refreshResult);

//       // Якщо рефреш успішний, підтягуємо актуальні дані юзера
//       console.log("🔄 Fetching user data...");
//       await dispatch(getUser());
//     } catch (error) {
//       console.error("❌ Error refreshing user:", error);
//       if (error === "Unauthorized") {
//         navigate("/register", { replace: true });
//       }
//     }
//   };

//   fetchUserData();
// }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);
