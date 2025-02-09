import { Navigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from '../redux/auth/selectors';
// navigation to father

export default function PrivateRoute({ component, redirectTo }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? component : <Navigate to={redirectTo} />;
}

// export const PrivateRoute = (
//     { component: Component, redirectTo = '/' }) => {
//     const isloggedIn = useSelector(selectIsLoggedIn);
//     return isloggedIn ? Component : <Navigate to={redirectTo} />
// };