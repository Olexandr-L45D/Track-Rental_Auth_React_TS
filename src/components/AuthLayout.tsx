import { Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

const AuthLayout = () => {
  return (
    <>
          {/* <HomePage /> */}
          <h3>Hello</h3>
      <Outlet /> {/* Тут рендеряться вкладені маршрути */}
    </>
  );
};

export default AuthLayout;
