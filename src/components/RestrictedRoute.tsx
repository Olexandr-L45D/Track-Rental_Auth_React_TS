

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

interface RestrictedRouteProps {
  component: JSX.Element | (() => JSX.Element);
  redirectTo: string;
}

export default function RestrictedRoute({ component, redirectTo }: RestrictedRouteProps): JSX.Element {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log("🔍 RestrictedRoute check: isLoggedIn =", isLoggedIn);

  if (isLoggedIn) {
    console.log("🔄 User already logged in! Redirecting to", redirectTo);
    return <Navigate to={redirectTo} />;
  }

  console.log("✅ User NOT logged in! Rendering component:", component);
  return typeof component === "function" ? component() : component;
}


