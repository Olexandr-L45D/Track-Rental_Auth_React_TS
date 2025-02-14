import { useTranslation } from "react-i18next";
import css from "./RegistrationPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import {  useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const RegistrationPage = (): JSX.Element => {
  const [isRegistering, setIsRegistering] = useState(true);
  const { t } = useTranslation();
  const [attempts, setAttempts] = useState(0);

  return (
   
      <div className={css.background}>
      <section className={css.sectinPage}>
        <div className={css.card}>
          
          <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
          <h3 className={css.cartText}>{t("navigation.titleWelcom")}</h3>
  
        </div>
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
