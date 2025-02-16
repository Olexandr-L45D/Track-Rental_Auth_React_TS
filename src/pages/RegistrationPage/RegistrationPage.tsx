import { useTranslation } from "react-i18next";
import css from "./RegistrationPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import {  useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SendResetEmailForm from "../../components/SendResetEmailForm/SendResetEmailForm";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const RegistrationPage = (): JSX.Element => {
  const [isRegistering, setIsRegistering] = useState(true);
  const { t } = useTranslation();
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
   const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);

  // У компоненті після реєстрації
// useEffect(() => {
//   if (isLoggedIn) {
//     navigate("/catalog");  // Переходимо на каталог
//   }
//   }, [isLoggedIn, navigate]);
//   useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token && isLoggedIn) {
//     navigate("/catalog");
//   }
// }, [isLoggedIn, navigate]);

  return (
   
      <div className={css.background}>
      <section className={css.sectinPage}>
        <div className={css.card}>
          
          <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
          <h3 className={css.cartText}>{t("navigation.titleWelcom")}</h3>
  
        </div>
        <section className={css.cartFormSection}>
  
        <div className={css.cartPage}>
            <h3 className={css.cartForm}>{t("register.titleRegistr")}</h3>
            
          <div className={css.switchButtons}>
            <button 
              className={isRegistering ? css.active : ""} 
              onClick={() => setIsRegistering(true)}
            >
              Register
            </button>
            <button 
              className={!isRegistering ? css.active : ""} 
              onClick={() => setIsRegistering(false)}
            >
              Log In
            </button>
          </div>
  
          {isRegistering ? <RegistrationForm /> : <LoginForm attempts={attempts} setAttempts={setAttempts}/>}
          </div>

          
        <div className={css.cartPageApply}>
            <h3 className={css.cartForm}>Autorization to mail</h3>
            
          <div className={css.switchButtons}>
            <button 
              className={isRegistering ? css.active : ""} 
              onClick={() => setIsRegistering(true)}
            >
              ResetEmail
            </button>
            <button 
              className={!isRegistering ? css.active : ""} 
              onClick={() => setIsRegistering(false)}
            >
              ResetPassword
            </button>
          </div>
  
          {isRegistering ? <SendResetEmailForm /> : <ResetPasswordForm/>}
          </div>
          
          </section>
          </section>
    </div>

  );
};
   

  export default RegistrationPage;
  
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
