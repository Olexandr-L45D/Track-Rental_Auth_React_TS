
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  // component: () => JSX.Element;
  component: JSX.Element | (() => JSX.Element); // ✅ Додаємо функцію в типізацію
  redirectTo: string;
}

export default function PrivateRoute({ component, redirectTo }: PrivateRouteProps): JSX.Element {
  
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
   const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);

  if (isRefreshing) {
    return <p>Loading...</p>; // Або спінер
  }

  // console.log("🔍 PrivateRoute check: isLoggedIn =", isLoggedIn);

  if (!isLoggedIn) {
    // console.log("❌ User not logged in! Redirecting to", redirectTo);
    return <Navigate to={redirectTo} />;
  }

  // console.log("✅ User logged in! Rendering component.");
  return typeof component === "function" ? component() : component; // ✅ Виконуємо функцію, якщо це функція
};


// Якщо користувач залогінений, показує компонент (component). Якщо ні, перенаправляє (redirectTo) to = element={<Navigate to="/login" />} />



// export default PrivateRoute;

// Використовую PrivateRoute: для сторінок, доступних лише після авторизації (наприклад, /catalog чи подумаю (якісь власні колекції, події, бронювання і інше)),
