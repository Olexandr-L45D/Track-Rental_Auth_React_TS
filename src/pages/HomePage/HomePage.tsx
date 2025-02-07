import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <div className={css.background}>
      <section className={css.card}>
        <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
        <h3 className={css.cartText}>{t("navigation.titleWelcom")}</h3>
        <section className={css.cartBtn}>
          <Link to="/catalog">
            <div className={css.buttonViews}>
              <button className={css.btnVie} type="submit">
                {t("navigation.View")}
              </button>
            </div>
          </Link>
        </section>
      </section>
    </div>
  );
}
