import { NavLink } from "react-router-dom";
import sprite from "../../images/sprite.svg";
import css from "./AllTruckListImages.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectTrucks } from "../../redux/filters/selectors";
import { useEffect } from "react";
import { AppThunkDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { selectPage } from "../../redux/campers/selectors";
import { fetchAllTruckImage } from "../../redux/campers/operations";

export interface TruckAlImages {
  id: number;
  name: string;
  gallery: { original: string; thumb: string }[];
}

export default function AllTruckListImages(): JSX.Element {
  const trucks = useSelector(selectTrucks) as TruckAlImages[];

  if (!trucks || trucks.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className={css.containerList}>
      <ul className={css.list}>
        {trucks.map(truck => (
          <li key={truck.id} className={css.cartItem}>
            <figure className={css.imgCard}>
              <img
                className={css.img}
                src={truck.gallery[0].thumb} // Відображаємо тільки зображення
                alt={truck.name}
              />
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
