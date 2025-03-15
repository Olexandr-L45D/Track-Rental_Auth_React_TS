import css from "./AuthNav.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";

export const AuthNav = (): JSX.Element => {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className={css.container}>
      <div>
        <Link to="/login">
          <button className={`${css.btnLink} ${!isRegister ? css.active : ""}`}>
            {t("navigation.login")}
          </button>
        </Link>
        <Link to="/register">
          <button className={`${css.btnLink} ${isRegister ? css.active : ""}`}>
            {t("navigation.register")}
          </button>
        </Link>

        <Link to="/reset-pwd">
          <button className={`${css.btnLink} ${!isRegister ? css.active : ""}`}>
            {t("register.titlePassword")}
          </button>
        </Link>
      </div>
    </div>
  );
};
