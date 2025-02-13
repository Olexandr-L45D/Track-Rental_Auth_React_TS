// navigation to father
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../redux/auth/selectors";
import { RootState } from "../redux/store";

export default function RestrictedRoute({ component, redirectTo }: { component: JSX.Element; redirectTo: string }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}

// Якщо isLoggedIn === true, переспрямовуємо на redirectTo, інакше показуємо компонент.
// export interface RestrictedRouteProps {
//   component: JSX.Element;
//   redirectTo: string;
// }

// const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
//   component,
//   redirectTo,
// }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);
  
//   return isLoggedIn ? <Navigate to={redirectTo} /> : component;
// };

// export default RestrictedRoute;

// const isLoggedIn = useSelector(selectIsLoggedIn); = Отримуємо статус авторизації з Redux.
// return isLoggedIn ? <Navigate to={redirectTo} /> : component;
// Якщо isLoggedIn === true, користувача перенаправляє на сторінку redirectTo (наприклад, /catalog).

// Цей компонент RestrictedRoute використовується для захисту маршрутів у твоєму додатку. Він обмежує доступ до певних сторінок для користувачів, які вже авторизовані. Давай розберемося детальніше, як саме він працює.
// RestrictedRoute перевіряє, чи користувач авторизований:

// Якщо користувач авторизований (isLoggedIn = true) — він автоматично перенаправляється (redirect) на іншу сторінку (наприклад, у каталог).
// Якщо користувач НЕ авторизований (isLoggedIn = false) — йому показується переданий компонент (наприклад, форма логіну або реєстрації).
// Це корисно для того, щоб, наприклад, авторизовані користувачі не могли знову зайти на сторінку логіну чи реєстрації.

// Navigate з react-router-dom використовується для автоматичного перенаправлення користувача на іншу сторінку.
// useSelector підключає компонент до Redux і отримує значення стану.
// selectIsLoggedIn — це селектор, який повертає true або false в залежності від того, чи користувач залогінений.

// component — це React-компонент, який буде відображатись, якщо користувач не залогінений (наприклад, <LoginPage />).
/**
 * - If the route is restricted and the user is logged in,
 *  render a <Navigate> to redirectTo
 * - Otherwise render the component
 */
// код що був до типізаціїї:

// export default function RestrictedRoute({ component, redirectTo }) {
//     const isLoggedIn = useSelector(selectIsLoggedIn);

//     return isLoggedIn ? <Navigate to={redirectTo} /> : component;
// }

// export const RestrictedRoute = (
//     { component: Component, redirectTo = '/' }) => {
//     const isLoggedIn = useSelector(selectIsLoggedIn);

//     return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
// };


// register: user {name: "SidorovIlly", email: "sidorovillyaleks@gmail.com"}