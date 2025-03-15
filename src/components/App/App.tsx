import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
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
  // const hasRedirected = useRef(false);
  // const [hasRedirected, setHasRedirected] = useState(false);

  // запит на ТОКЕН isRefreshing (чи валідний токен?)
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

          {/* <Route
            path="/googleauth"
            element={
              <RestrictedRoute
                component={<GoogleRedirectHandler />}
                redirectTo="/home"
              />
            }
          /> */}
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

//   useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Token Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);
//   console.log("📌 accessToken:", accessToken);
//   console.log("⚠️ Already redirected:", window.redirected);
//   console.log("📦 First visit flag before check:", localStorage.getItem("firstVisit"));

//   if (window.redirected) {
//     console.log("🛑 Skipping redirect, already redirected.");
//     return;
//   }

//   const isFirstVisit = !localStorage.getItem("firstVisit");

//   if (isFirstVisit) {
//     console.log("🔥 First visit detected! Saving flag...");
//     localStorage.setItem("firstVisit", "true");

//     if (!isLoggedIn && !isRefreshing) {
//       console.log("⏳ Redirecting to /register...");
//       window.redirected = true;
//       navigate("/register", { replace: true });
//       return;
//     }
//   }

//   if (!isLoggedIn && !isRefreshing && location.pathname !== "/register" && location.pathname !== "/") {
//     console.log("🔄 Redirecting to /login...");
//     window.redirected = true;
//     navigate("/login", { replace: true });
//     return;
//   }

//   if (isLoggedIn) {
//     console.log("🚀 Redirecting to /catalog");
//     navigate("/catalog", { replace: true });
//     return;
//   }

// }, [isLoggedIn, isRefreshing, navigate, location.pathname]);

// useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Token Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);
//   console.log("📌 accessToken:", accessToken);
//   console.log("⚠️ Already redirected:", window.redirected);
//   console.log("📦 First visit flag before check:", localStorage.getItem("firstVisit"));

//   if (window.redirected) {
//     console.log("🛑 Skipping redirect, already redirected.");
//     return;
//   }

//   const isFirstVisit = !localStorage.getItem("firstVisit");

//   if (isFirstVisit) {
//     console.log("🔥 First visit detected! Saving flag...");
//     localStorage.setItem("firstVisit", "true");

//     if (!isLoggedIn && !isRefreshing) {
//       console.log("⏳ Redirecting to / (home)...");
//       window.redirected = true;
//       navigate("/", { replace: true });
//       return;
//     }
//   }

//   if (!isLoggedIn && !isRefreshing && location.pathname !== "/register" && location.pathname !== "/") {
//     console.log("🔄 Redirecting to /login...");
//     window.redirected = true;
//     navigate("/login", { replace: true });
//     return;
//   }

//   if (isLoggedIn) {
//     console.log("🚀 Redirecting to /catalog");
//     navigate("/catalog", { replace: true });
//     return;
//   }

// }, [isLoggedIn, isRefreshing, navigate, location.pathname]);

//   useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Token Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);
//   console.log("📌 accessToken:", accessToken);
//   console.log("⚠️ Already redirected:", window.redirected);
//   console.log("📦 First visit flag before check:", localStorage.getItem("firstVisit"));

//   if (window.redirected) {
//     console.log("🛑 Skipping redirect, already redirected.");
//     return;
//   }

//   if (!localStorage.getItem("firstVisit")) {
//     console.log("🔥 First visit detected! Saving flag...");
//     localStorage.setItem("firstVisit", "true");

//     if (!isLoggedIn && !isRefreshing) {
//       console.log("⏳ Redirecting to /register in 100ms...");
//       window.redirected = true;

//       setTimeout(() => {
//         console.log("🚀 Now navigating to /register");
//         navigate("/register", { replace: true });
//       }, 100);

//       return;
//     }
//   }

//   if (!isLoggedIn && !isRefreshing && location.pathname !== "/register") {
//     console.log("🔄 Checking redirect to /login...");
//     window.redirected = true;
//     navigate("/login", { replace: true });
//     return;
//   }

//   if (isLoggedIn && isRefreshing) {
//     console.log("🚀 Redirecting to /catalog");
//     navigate("/catalog", { replace: true });
//     return;
//   }

// }, [isLoggedIn, isRefreshing, navigate, location.pathname]);

//  цей юзефект з записсом в СеіюСторедж sessionStorage.getItem("alreadyRedirected"));
//   useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Token Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);
//     console.log("📌 accessToken:", accessToken);
//    console.log("⚠️ Already redirected (sessionStorage):", sessionStorage.getItem("alreadyRedirected"));
//     console.log("📦 First visit flag before check:", localStorage.getItem("firstVisit"));

//     // 🛑 Якщо ми вже перенаправляли на /register, більше не робимо редіректи
//   if (sessionStorage.getItem("alreadyRedirected")) {
//     console.log("🛑 Skipping redirect, already redirected.");
//     return;
//   }

//   if (!localStorage.getItem("firstVisit")) {
//     console.log("🔥 First visit detected! Saving flag...");
//     localStorage.setItem("firstVisit", "true");

//   if (!isLoggedIn && !isRefreshing) {
//       console.log("⏳ Redirecting to /register in 100ms...");
//       sessionStorage.setItem("alreadyRedirected", "true");

//       setTimeout(() => {
//         console.log("🚀 Now navigating to /register");
//         navigate("/register", { replace: true });
//       }, 100);

//       return;
//     }
//   }

//   if (!isLoggedIn && !isRefreshing && location.pathname !== "/register") {
//     console.log("🔄 Checking redirect to /login...");
//     sessionStorage.setItem("alreadyRedirected", "true");
//     navigate("/login", { replace: true });
//     return;
//   }

//   if (isLoggedIn && isRefreshing) {
//     console.log("🚀 Redirecting to /catalog");
//     navigate("/catalog", { replace: true });
//     return;
//   }
// }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);

// useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Token Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);
//   console.log("📌 accessToken:", accessToken);

//   const savedToken = localStorage.getItem("jwt-token");
//   console.log("📦 Token from LocalStorage:", savedToken);
//   console.log("📦 First visit flag:", localStorage.getItem("firstVisit")); // 🛠 Додаємо лог

//   if (savedToken && !accessToken) {
//     console.log("📦 Loaded token from LocalStorage:", savedToken);
//     dispatch(setToken({ accessToken: savedToken, user }));
//   }

//  // 🟢 Перевіряємо, чи це перший візит (якщо "firstVisit" ще не записано)
//   if (!localStorage.getItem("firstVisit")) {
//     console.log("🔥 First visit detected! Saving flag...");
//     localStorage.setItem("firstVisit", "true");

//     // Якщо користувач не залогінений, відправляємо його на реєстрацію
//     if (!isLoggedIn && !isRefreshing) {
//       console.log("🚀 Redirecting to /register (first visit)");
//       navigate("/register", { replace: true });
//       return;
//     }
//   }

//   // 🔵 Якщо користувач не залогінений і намагається зайти в закритий розділ → відправляємо на логін
//   if (!isLoggedIn && !isRefreshing && location.pathname !== "/register") {
//     console.log("🚀 Redirecting to /login");
//     navigate("/login", { replace: true });
//     return;
//   }
//       if (isLoggedIn && isRefreshing) {
//       console.log("🚀 Redirecting to /catalog");
//       navigate("/catalog", { replace: true });
//     return;
//   }

// }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);

// Пробува такий маршрут але чат пише що поки не варто додав перевірку на ФЕРСТ візіт

/* Додаю додатковий маршрут(його раніше не було) для НЕ зарегестрованого Юзера */
// <Route path="/catalog" element={<PrivateRoute redirectTo="/register" component={() => <TruckPageFilters />} />} />

//   useEffect(() => {
//   console.log("🟢 useEffect TRIGGERED (Token Check)");
//   console.log("📌 Поточний маршрут:", location.pathname);
//   console.log("📌 isLoggedIn:", isLoggedIn);
//   console.log("📌 accessToken:", accessToken);

//   const savedToken = localStorage.getItem("jwt-token");
//     console.log("📦 Token from LocalStorage:", savedToken);
//     if (savedToken && !accessToken) {
//     console.log("📦 Loaded token from LocalStorage:", savedToken);
//     dispatch(setToken({ accessToken: savedToken, user }));
//   }

//     if (!isLoggedIn && !isRefreshing) {
//       console.log("🚀 Redirecting to login");
//       navigate("/login", { replace: true });
//     return;
//     }
//     if (isLoggedIn && isRefreshing) {
//       console.log("🚀 Redirecting to login");
//       navigate("/catalog", { replace: true });
//     return;
//   }

// }, [accessToken, isLoggedIn, isRefreshing, dispatch, navigate, location.pathname]);

// цей варіант блокує перехід далі по АЙДІ!!!
// 🟢 Якщо користувач залогінений, але ще не в каталозі – перенаправляємо
// if (isLoggedIn && location.pathname !== "/catalog") {
//   console.log("🚀 Redirecting to /catalog");
//   // setTimeout(() => navigate("/catalog", { replace: true }), 100);
//   navigate("/catalog", { replace: true });
// }

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

// useEffect(() => {

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
