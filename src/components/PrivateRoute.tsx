import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  component: React.ComponentType;
  redirectTo: string;
}

export default function PrivateRoute({
  component: Component,
  redirectTo,
}: PrivateRouteProps): JSX.Element {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isRefreshing = useSelector(
    (state: RootState) => state.auth.isRefreshing
  );

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} replace />; // ✅ Виконуємо функцію, якщо це функція
}

// export default function PrivateRoute({ component, redirectTo }: PrivateRouteProps): JSX.Element {

//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
//   const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
//    console.log("🔒 PrivateRoute check:", { isLoggedIn, isRefreshing });
//   // ⏳ Поки йде оновлення стану, не редиректимо
//   if (isRefreshing) {
//     return <p>Loading...</p>; // Або спінер
//   }
// // Якщо юзер не залогінений і на сторінці реєстрації чи логіну — пропускаємо
//   if (!isLoggedIn && (location.pathname === "/register" || location.pathname === "/login")) {
//     return typeof component === "function" ? component() : component;
//   }
//   if (!isLoggedIn) {
//     // console.log("❌ User not logged in! Redirecting to", redirectTo);
//     return <Navigate to={redirectTo} replace/>;
//   }

//   // console.log("✅ User logged in! Rendering component.");
//   return typeof component === "function" ? component() : component; // ✅ Виконуємо функцію, якщо це функція
// };

// Якщо користувач залогінений, показує компонент (component). Якщо ні, перенаправляє (redirectTo) to = element={<Navigate to="/login" />} />

// Використовую PrivateRoute: для сторінок, доступних лише після авторизації (наприклад, /catalog чи подумаю (якісь власні колекції, події, бронювання і інше)),
