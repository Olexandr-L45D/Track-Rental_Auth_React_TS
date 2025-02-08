import clsx from "clsx";
import css from "./Navigation.module.css";
import sprite from "../../images/sprite.svg";
import { useTranslation } from "react-i18next";
import {Link, NavLink, NavLinkProps } from "react-router-dom";

const newLinkClass: NavLinkProps["className"] = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation: React.FC = () => {
  const { i18n } = useTranslation(); // Додано хук
  // Функція для зміни мови
  const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
   };

  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <section className={css.container}>
      <div className={css.title}>
        <Link to="/">
          <svg className={css.iconLogo}>
            <use href={`${sprite}#icon-truckLogo`} />
          </svg>
        </Link>
      </div>
      <section className={css.card}>
        <nav className={css.nav}>
          <NavLink to="/" className={newLinkClass}>
            {t("navigation.home")}
          </NavLink>
          <NavLink to="/catalog" className={newLinkClass}>
            {t("navigation.catalog")}
          </NavLink>
        </nav>
      </section>
      <div className={css.languageSwitcher}>
        <button
          className={css.activeButton}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
        <button
          className={css.activeButton}
          onClick={() => changeLanguage("uk")}
        >
          UA
        </button>
      </div>
    </section>
  );
};

