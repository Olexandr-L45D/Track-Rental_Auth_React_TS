import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import sprite from "../../images/sprite.svg";
import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { setLanguage } from "../../redux/sliceLanguage";
// import { fetchAllTruckLanguage } from "../../redux/campers/operations";

const newLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation = () => {
  // const dispatch = useDispatch();
  const { i18n } = useTranslation(); // Додано хук
  // Функція для зміни мови
  const changeLanguage = language => {
    i18n.changeLanguage(language);
    // dispatch(setLanguage(language)); // Міняємо Redux-стан мови
    // dispatch(fetchAllTruckLanguage()); // Перезапитуємо trucks вже на новій мові
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
