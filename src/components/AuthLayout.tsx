import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <h3>Hello</h3>
      <Outlet /> {/* Тут рендеряться вкладені маршрути */}
    </>
  );
};

export default AuthLayout;
