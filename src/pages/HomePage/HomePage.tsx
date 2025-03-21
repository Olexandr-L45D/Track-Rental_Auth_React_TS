import { Link, useNavigate } from "react-router-dom";
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

  return (
    <div className={css.container}>
      <section className={css.card}>
        <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
        <h3 className={css.cartText}>{t("navigation.titleWelcom")}</h3>

        <section className={css.cartBtn}>
          <Link to="/gallery">
            <div className={css.buttonViews}>
              <button className={css.btnVie} type="submit">
                {t("navigation.ViewImages")}
              </button>
            </div>
          </Link>
        </section>
      </section>
    </div>
  );
}

// Якщо користувач залогінений  перекидаємо на /catalog
// useEffect(() => {
//   if (isLoggedIn) {
//     navigate("/catalog");
//   }
// }, [isLoggedIn, navigate]);
