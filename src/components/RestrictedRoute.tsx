// import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

interface RestrictedRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export default function RestrictedRoute({ component, redirectTo }: RestrictedRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}
