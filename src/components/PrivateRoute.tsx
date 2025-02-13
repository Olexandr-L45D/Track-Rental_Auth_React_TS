import { Navigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../redux/auth/selectors";
// import { RestrictedRouteProps } from "./RestrictedRoute";
import { RootState } from "../redux/store";
//PrivateRoute is navigation to father

export default function PrivateRoute({ component, redirectTo }: { component: JSX.Element; redirectTo: string }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}

// Якщо isLoggedIn === false, переспрямовуємо на redirectTo.

// const PrivateRoute: React.FC<RestrictedRouteProps> = ({
//   component,
//   redirectTo,
// }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return isLoggedIn ? component : <Navigate to={redirectTo} />;
// };

// export default PrivateRoute;

// Використовую PrivateRoute: для сторінок, доступних лише після авторизації (наприклад, /catalog чи подумаю (якісь власні колекції, події, бронювання і інше)),
