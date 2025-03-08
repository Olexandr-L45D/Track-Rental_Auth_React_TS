

import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { RootState } from "../redux/store";

interface RestrictedRouteProps {
  component: JSX.Element | (() => JSX.Element);
  redirectTo: string;
}

export default function RestrictedRoute({ component, redirectTo }: RestrictedRouteProps): JSX.Element {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
  const location = useLocation();

   console.log("🔍 RestrictedRoute check:", { isLoggedIn, isRefreshing, pathname: location.pathname });
  // ⏳ Не редиректимо, поки триває рефреш
  if (isRefreshing) {
    return <p>Loading...</p>;
  }
// 🛑 Не редіректимо, якщо це сторінка реєстрації (або інша публічна)
  if (location.pathname === "/register" || location.pathname === "/login") {
    console.log("✅ Allowing access to", location.pathname);
    return typeof component === "function" ? component() : component;
  }

  if (isLoggedIn) {
    console.log("🔄 User already logged in! Redirecting to", redirectTo);
    return <Navigate to={redirectTo} />;
  }
 return isLoggedIn ? (<Navigate to={redirectTo} replace />) : (typeof component === "function" ? component() : component);
  // return typeof component === "function" ? component() : component;
}


// export default function RestrictedRoute({ component, redirectTo }: RestrictedRouteProps): JSX.Element {
//  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
//  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);

//   if (isRefreshing) {
//     return <p>Loading...</p>; // Або спінер
//   }
//   // console.log("🔍 RestrictedRoute check: isLoggedIn =", isLoggedIn);
//   if (isLoggedIn) {
//     // console.log("🔄 User already logged in! Redirecting to", redirectTo);
//     return <Navigate to={redirectTo} />;
//   }

//   // console.log("✅ User NOT logged in! Rendering component:", component);
//   return typeof component === "function" ? component() : component;
// }


