import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function PrivateRoute({ redirectTo }: { redirectTo: string }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};





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
