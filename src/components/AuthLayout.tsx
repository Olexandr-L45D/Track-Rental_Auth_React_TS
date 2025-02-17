import { Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

const AuthLayout = () => {
  return (
    <div>
          {/* <HomePage /> */}
          <h3>Hello</h3>
      <Outlet /> {/* Тут рендеряться вкладені маршрути */}
    </div>
  );
};

export default AuthLayout;
