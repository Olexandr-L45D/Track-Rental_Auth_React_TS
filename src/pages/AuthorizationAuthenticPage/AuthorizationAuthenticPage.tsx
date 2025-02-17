import { useTranslation } from "react-i18next";
import css from "./AuthorizationAuthenticPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import {  useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AuthorizationAuthenticPage = (): JSX.Element => {
  const [isRegistering, setIsRegistering] = useState(true);
  const { t } = useTranslation();
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
   const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);

  return (
    <section className={css.background}>
      <section className={css.sectinPage}>
        <div className={css.card}>
          
          <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
          <h2 className={css.cartText}>{t("navigation.titleWelcom")}</h2>
  
        </div>
        <section className={css.cartFormSection}>
  
        <div className={css.cartPage}>
            <h3 className={css.cartForm}>{t("register.titleRegistr")}</h3>
            
          <div className={css.switchButtons}>
            <button onClick={() => navigate("/register")}>    
                {t("navigation.register")}
            </button>
            <button onClick={() => navigate("/login")}>
                {t("navigation.login")}
            </button>
          </div>
  
          {!isLoggedIn ? <RegistrationForm /> : <LoginForm attempts={attempts} setAttempts={setAttempts}/>}
          </div>

          </section>
          </section>
    </section>
  );
};
   
  export default AuthorizationAuthenticPage;
  
  //  <div className={css.background}>
  //     <section className={css.card}>
  //       <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
  //       <h3 className={css.cartText}>{t("navigation.titleWelcom")}</h3>
  //       <section className={css.cartBtn}>

  //     <button onClick={() => setShowAuth(true)}>Identify Yourself</button>

  //     {/* Відображаємо AuthNav тільки після натискання кнопки */}
  //     {/* {showAuth && <AuthNav />} */}
  //         {/* <Link to="/catalog">
  //           <div className={css.buttonViews}>
  //             <button className={css.btnVie} type="submit">
  //               {t("navigation.View")}
  //             </button>
  //           </div>
  //         </Link> */}
  //       </section>
  //     </section>
  //   </div>
