
// import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

interface PrivateRouteProps {
  component: () => JSX.Element;
  redirectTo: string;
}

// export default function PrivateRoute({ component, redirectTo }: PrivateRouteProps) {
//   const isLoggedIn = useSelector(selectIsLoggedIn);
// //   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
//   return isLoggedIn ? component : <Navigate to={redirectTo} />;
// }

export default function PrivateRoute({ component: Component, redirectTo }: PrivateRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
}



// Якщо користувач залогінений, показує компонент (component). Якщо ні, перенаправляє (redirectTo) to = element={<Navigate to="/login" />} />



// export default PrivateRoute;

// Використовую PrivateRoute: для сторінок, доступних лише після авторизації (наприклад, /catalog чи подумаю (якісь власні колекції, події, бронювання і інше)),
