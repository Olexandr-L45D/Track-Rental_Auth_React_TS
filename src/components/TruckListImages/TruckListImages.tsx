//
import { NavLink } from "react-router-dom";
import sprite from "../../images/sprite.svg";
import css from "./TruckListImages.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectFilteredByLocation } from "../../redux/filters/selectors";
import { TruckDetailAll } from "../App/App.types";

export default function TruckListImages(): JSX.Element {
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
          <li key={truck.id} className={css.cartIte}>
            <article className={css.cartContainer}>
              <figure className={css.imgCard}>
                <img
                  className={css.img}
                  src={truck.gallery[0].thumb}
                  alt={truck.name}
                />
              </figure>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
