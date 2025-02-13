
import css from "./AuthNav.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";

export const AuthNav = (): JSX.Element => {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  
  return (
    <div className={css.blokLink}>
      <div>
        <button className={`${css.btnLink} ${!isRegister ? css.active : ""}`}
          onClick={() => setIsRegister(false)} disabled={!isRegister}>
          {t("navigation.login")}
        </button>
        <button className={`${css.btnLink} ${isRegister ? css.active : ""}`}
          onClick={() => setIsRegister(true)} disabled={isRegister}>
          {t("navigation.register")}
        </button>
      </div>

      {isRegister ? <RegistrationPage /> : <LoginPage />}
     
    </div>
  );
};
