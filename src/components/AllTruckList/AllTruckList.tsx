import { NavLink } from "react-router-dom";
import sprite from "/images/sprite.svg";
import css from "./AllTruckList.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectFilteredByLocation } from "../../redux/filters/selectors";
import { TruckDetailAll } from "../App/App.types";

export default function AllTruckList(): JSX.Element {
  const { t } = useTranslation();
  // Використовуємо мемоізований селектор а саме Селектор фільтрації вантажівок за локацією
  const trucks = useSelector(selectFilteredByLocation) as TruckDetailAll[];
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

//  all descriptions Truck
//             "id": "2",
//             "name": "Cruise America C-21",
//             "price": 8000,
//             "rating": 4.3,
//             "location": "Ukraine, Poltava",
//             "description": "Discover the charm of the open road with the Cruise America C-21, a compact and versatile alcove-style motorhome. Ideal for couples or small families, this motorhome combines practicality with comfort, offering an efficient and enjoyable travel experience. The Cruise America C-21 is designed to provide you with the freedom to explore while ensuring a cozy retreat at the end of the day.",
//             "form": "alcove",
//             "length": "6.4m",
//             "width": "2.34m",
//             "height": "3.72m",
//             "tank": "151l",
//             "consumption": "21l/100km",
//             "transmission": "automatic",
//             "engine": "petrol",
//             "AC": true,
//             "bathroom": true,
//             "kitchen": true,
//             "TV": false,
//             "radio": true,
//             "refrigerator": true,
//             "microwave": true,
//             "gas": true,
//             "water": true,
// "transmission": "manual",
//             "engine": "petrol",
// }
