import {  useNavigate } from "react-router-dom";
import css from "./HomePage.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { AuthNav } from "../../components/AuthNav/AuthNav";

export default function HomePage(): JSX.Element {
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
// Якщо користувач залогінений  перекидаємо на /catalog
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/catalog");
    }
  }, [isLoggedIn, navigate]);
  
  return (
    <div className={css.background}>
      <section className={css.card}>
        <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
        <h3 className={css.cartText}>{t("navigation.titleWelcom")}</h3>
        <section className={css.cartBtn}>

      <button onClick={() => setShowAuth(true)}>Identify Yourself</button>

      {/* Відображаємо AuthNav тільки після натискання кнопки */}
      {/* {showAuth && <AuthNav />} */}
          {/* <Link to="/catalog">
            <div className={css.buttonViews}>
              <button className={css.btnVie} type="submit">
                {t("navigation.View")}
              </button>
            </div>
          </Link> */}
        </section>
      </section>
    </div>
  );
};
