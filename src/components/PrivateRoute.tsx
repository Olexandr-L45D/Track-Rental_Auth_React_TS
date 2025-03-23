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

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} replace />;
}
