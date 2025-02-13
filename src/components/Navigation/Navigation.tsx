import clsx from "clsx";
import css from "./Navigation.module.css";
import sprite from "../../images/sprite.svg";
import { useTranslation } from "react-i18next";
import {Link, NavLink, NavLinkProps } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const newLinkClass: NavLinkProps["className"] = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation: React.FC = () => {
  const { i18n } = useTranslation(); // Додано хук
  const { t } = useTranslation();
   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Перевірка на авторизацію
  // Функція для зміни мови без зберігання в localStorage
  // const changeLanguage = (language: string) => {
  // i18n.changeLanguage(language);
  // };
//   const changeLanguage = (language: string) => {
//   i18n.changeLanguage(language);
//   localStorage.setItem('appLanguage', language);
  // };
  const changeLanguage = (language: string) => {
  if (i18n.language !== language) {
    i18n.changeLanguage(language);
    localStorage.setItem('appLanguage', language);
  }
};

// При ініціалізації
const savedLanguage = localStorage.getItem('appLanguage') || 'en';
i18n.changeLanguage(savedLanguage);


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
      {/* Умовний рендеринг компонентів */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
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

