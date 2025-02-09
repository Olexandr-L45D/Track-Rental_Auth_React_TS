import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const newLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const AuthNav = () => {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <div className={css.blokLink}>
      <NavLink className={newLinkClass} to="/register">
        {t("navigation.register")}
      </NavLink>
      <NavLink className={newLinkClass} to="/login">
        {t("navigation.login")}
      </NavLink>
    </div>
  );
};
