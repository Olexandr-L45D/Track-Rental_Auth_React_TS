import clsx from "clsx";
import css from "./Navigation.module.css";
import sprite from "../../images/sprite.svg";
import { useTranslation } from "react-i18next";
import { NavLink, NavLinkProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import  AuthorizationAuthentic  from "../AuthorizationAuthentic/AuthorizationAuthentic";

const newLinkClass: NavLinkProps["className"] = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation = (): JSX.Element => {
  const { i18n } = useTranslation(); // Додано хук
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Перевірка на авторизацію

  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);

  const changeLanguage = (language: string) => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
      localStorage.setItem("appLanguage", language);
    }
  };

  return (
    <section className={css.container}>
      <div className={css.title}>
        <NavLink to="/" className={css.navLink}>
          <svg className={css.iconLogo}>
            <use href={`${sprite}#icon-truckLogo`} />
          </svg>
        </NavLink>
      </div>

      <section className={css.card}>
        <nav className={css.nav}>
          {isLoggedIn && (
            <NavLink to="/catalog" className={newLinkClass}>
              {t("navigation.catalog")}
            </NavLink>
          )}
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
