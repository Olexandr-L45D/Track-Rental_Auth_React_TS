import { useAppSelector } from "../../redux/hooks";
import sprite from "../../images/sprite.svg";
import css from "./TruckFeatures.module.css";
import BookingForm from "../BookingForm/BookingForm";
import { useTranslation } from "react-i18next";
import { TruckDetailAll } from "../App/App.types";
import { SendResetEmailFormProps } from "../SendResetEmailForm/SendResetEmailForm";

const TruckFeatures = ({ onClose }: SendResetEmailFormProps): JSX.Element => {
  const { selectedTruck } = useAppSelector(
    state => state.campers as { selectedTruck: TruckDetailAll | null }
  );
  const { t } = useTranslation();
  // Перевірка на випадок, якщо selectedTruck ще не завантажений
  if (!selectedTruck) {
    return <p>{t("navigation.loading")}</p>;
  }

  return (
    <section className={css.cartBottomDetall}>
      <section className={css.cartComentBloks}>
        <ul className={css.descripBl}>
          <li className={css.textdes}>
            <svg className={css.icon}>
              <use href={`${sprite}#icon-aut`} />
            </svg>
            <strong>
              {selectedTruck.transmission.charAt(0).toUpperCase() +
                selectedTruck.transmission.slice(1)}
            </strong>
          </li>

          <li className={css.textdes}>
            <svg className={css.icon}>
              <use href={`${sprite}#icon-ac`} />
            </svg>
            <strong>AC:</strong> {selectedTruck.AC ? "Yes" : "No"}
          </li>

          <li className={css.textdes}>
            <svg className={css.icon}>
              <use href={`${sprite}#icon-petrol`} />
            </svg>
            <strong>
              {selectedTruck.engine.charAt(0).toUpperCase() +
                selectedTruck.engine.slice(1)}
            </strong>
          </li>

          <li className={css.textdes}>
            <svg className={css.icon}>
              <use href={`${sprite}#icon-kitch`} />
            </svg>
            <strong>Kitchen:</strong> {selectedTruck.kitchen ? "Yes" : "No"}
          </li>
        </ul>

        <section className={css.textContainers}>
          <div className={css.textTitleVeBlok}>
            <h3 className={css.textTitleVe}>{t("navigation.titleVeh")}</h3>
          </div>

          <ul className={css.textdesForm}>
            <li className={css.textdeskrip}>
              <p className={css.textTit}>{t("navigation.form")}</p>
              <p className={css.texBec}>{selectedTruck.form}</p>
            </li>

            <li className={css.textdeskrip}>
              <p className={css.textTit}>{t("navigation.lenght")}</p>
              <p className={css.texBec}>
                {`${selectedTruck.length}`.replace(/(\d)(m)$/, "$1 m")}
              </p>
            </li>

            <li className={css.textdeskrip}>
              <p className={css.textTit}>{t("navigation.width")}</p>
              <p className={css.texBec}>
                {`${selectedTruck.width}`.replace(/(\d)(m)$/, "$1 m")}
              </p>
            </li>

            <li className={css.textdeskrip}>
              <p className={css.textTit}>{t("navigation.height")}</p>
              <p className={css.texBec}>
                {`${selectedTruck.height}`.replace(/(\d)(m)$/, "$1 m")}
              </p>
            </li>

            <li className={css.textdeskrip}>
              <p className={css.textTit}>{t("navigation.tank")}</p>
              <p className={css.texBec}>
                {`${selectedTruck.tank}`.replace(/(\d)(l)$/, "$1 l")}
              </p>
            </li>

            <li className={css.textdeskrip}>
              <p className={css.textTit}>{t("navigation.consum")}</p>
              <p className={css.texBec}>{selectedTruck.consumption}</p>
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
};

export default TruckFeatures;
