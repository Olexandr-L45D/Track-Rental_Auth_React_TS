import { NavLink } from "react-router-dom";
import sprite from "../../images/sprite.svg";
import css from "./AllTruckList.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectFilteredByLocation } from "../../redux/filters/selectors";

export default function AllTruckList() {
  const { t } = useTranslation();
  // Використовуємо мемоізований селектор а саме Селектор фільтрації вантажівок за локацією
  const trucks = useSelector(selectFilteredByLocation);
  if (!trucks || trucks.length === 0) {
    return <div>No trucks available</div>; // Відобразіть це, якщо дані ще не завантажені
  }
  return (
    <div className={css.containerList}>
      <ul className={css.list}>
        {trucks.map(truck => (
          <li key={truck.id} className={css.cartItem}>
            <article className={css.cartContainer}>
              <figure className={css.imgCard}>
                <img
                  className={css.img}
                  src={truck.gallery[0].thumb}
                  alt={truck.name}
                />
              </figure>
              <section className={css.cartComent}>
                <div className={css.titlesblok}>
                  <h2 className={css.titles}>{truck.name}</h2>
                  <p className={css.textPrice}>€ {truck.price}</p>
                </div>

                <section className={css.descripBloc}>
                  <ul className={css.descripList}>
                    <li className={css.descripItem}>
                      <svg className={css.iconhed}>
                        <use href={`${sprite}#icon-star`} />
                      </svg>
                      <span className={css.loched}>
                        {truck.rating}
                        <strong>(Reviews)</strong>
                      </span>
                    </li>
                    <li className={css.descripItem}>
                      <svg className={css.iconhed}>
                        <use href={`${sprite}#icon-city`} />
                      </svg>
                      <span className={css.loched}>{truck.location}</span>
                    </li>
                  </ul>
                </section>

                <p className={css.textDescr}>{truck.description}</p>

                <ul className={css.featuresList}>
                  <li className={css.featuresItem}>
                    <svg className={css.icon}>
                      <use href={`${sprite}#icon-aut`} />
                    </svg>
                    <strong>
                      {truck.transmission.charAt(0).toUpperCase() +
                        truck.transmission.slice(1)}
                    </strong>
                  </li>
                  <li className={css.featuresItem}>
                    <svg className={css.icon}>
                      <use href={`${sprite}#icon-petrol`} />
                    </svg>
                    <strong>
                      {truck.engine.charAt(0).toUpperCase() +
                        truck.engine.slice(1)}
                    </strong>
                  </li>
                  <li className={css.featuresItem}>
                    <svg className={css.icon}>
                      <use href={`${sprite}#icon-kitch`} />
                    </svg>
                    <strong>Kitchen</strong> {truck.kitchen}
                  </li>
                </ul>
                <div className={css.featuresItemAc}>
                  <svg className={css.icon}>
                    <use href={`${sprite}#icon-ac`} />
                  </svg>
                  <strong>AC</strong> {truck.AC}
                </div>

                <button className={css.buttonIconShowe}>
                  <NavLink className={css.btnShowe} to={`/catalog/${truck.id}`}>
                    {t("navigation.show_more")}
                  </NavLink>
                </button>
              </section>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

// {
//   name,
//   id,
//   location,
//   price,
//   rating,
//   gallery,
//   description,
//   water,
//   engin,
//   kitchen,
// //   AC,
// "transmission": "manual",
//             "engine": "petrol",
// }
// <li key={id} className={css.cartItem}>
/* <ul>
  {trucks.map(truck => (
    <li key={truck.id}>
      <h3>{truck.name}</h3>
      <p>{truck.description}</p>
    </li>
  ))}
</ul>; */
