import { Navigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { RestrictedRouteProps } from "./RestrictedRoute";
// navigation to father

const PrivateRoute: React.FC<RestrictedRouteProps> = ({
  component,
  redirectTo,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;

// Використовую PrivateRoute: для сторінок, доступних лише після авторизації (наприклад, /catalog чи подумаю (якісь власні колекції, події, бронювання і інше)),
