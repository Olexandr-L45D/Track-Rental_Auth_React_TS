import clsx from "clsx";
import css from "./Navigation.module.css";
import sprite from "../../images/sprite.svg";
import { useTranslation } from "react-i18next";
import {Link, NavLink, NavLinkProps } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";
// import { AuthNav } from "../AuthNav/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  AuthorizationAuthentic  from "../AuthorizationAuthentic/AuthorizationAuthentic";

const newLinkClass: NavLinkProps["className"] = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation = (): JSX.Element => {

  const { i18n } = useTranslation(); // Додано хук
  const { t } = useTranslation();
   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Перевірка на авторизацію
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

   useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login"); // Перенаправляємо без диспатчу до лоігну
  }
}, [isLoggedIn, navigate]);

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

  // const handleResetNavigation = () => {
  //   if (isLoggedIn) {
  //     navigate("/auth/send-reset-email");
  //   } else {
  //     navigate("/register");
  //   }
  // };

  
  return (
    <section className={css.container}>
      <div className={css.title}>
        <Link to="/">
          <svg className={css.iconLogo}>
            <use href={`${sprite}#icon-truckLogo`} />
          </svg>
        </Link>
      </div>

       {/* при натисканні на кнопку має перекинути на AuthorizationAuthentic - Авторизації через лист та сміну паролю */}
        <nav className={css.nav}> 
        <button onClick={() => setIsOpen(true)}>ResEmeilPass</button>

        {isOpen && <AuthorizationAuthentic onClose={() => setIsOpen(false)} />}
         </nav>
        
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
     
      {isLoggedIn && <UserMenu /> }
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

