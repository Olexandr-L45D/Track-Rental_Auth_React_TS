import { useTranslation } from "react-i18next";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [attempts, setAttempts] = useState(0);
   const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔄 Checking isLoggedIn in LoginPage:", isLoggedIn);
    if (isLoggedIn) {
      console.log("✅ User is logged in! Navigating to /catalog...");
      navigate("/catalog", { replace: true });
    }
  }, [isLoggedIn, navigate]);
 
   return (
    <section className={css.background}>
      <section className={css.sectinPage}>
        <div className={css.card}>
          
          <h1 className={css.cartTitle}>Hello</h1>
          <h2 className={css.cartText}>Please log In</h2>
  
        </div>
        <section className={css.cartFormSection}>
  
        <div className={css.cartPage}>
            <h1 className={css.cartTitl}>{t("login.titleLogin")}</h1>
        <LoginForm attempts={attempts} setAttempts={setAttempts}/>
          </div>

          </section>
          </section>
    </section>
  );
};
export default LoginPage;

