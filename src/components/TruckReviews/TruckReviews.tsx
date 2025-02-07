import css from "./TruckReviews.module.css";
import { useSelector } from "react-redux";
import sprite from "../../images/sprite.svg";
import BookingForm from "../BookingForm/BookingForm";
import { useTranslation } from "react-i18next";

export default function TruckReviews() {
  const { selectedTruck } = useSelector(state => state.campers);
  const { t } = useTranslation();

  return (
    <div className={css.cartBottomDetall}>
      <section className={css.cartComentBloks}>
        <section className={css.textContainers}>
          <section className={css.reviewBlTitle}>
            <div className={css.textDescr}>
              <p className={css.textT}>
                {selectedTruck.reviews[0].reviewer_name.slice(0, 1)}
              </p>
            </div>
            <ul className={css.textDescrBl}>
              <li className={css.textDescr}>
                <p className={css.textN}>
                  {selectedTruck.reviews[0].reviewer_name}
                </p>
              </li>
              <li className={css.textDescr}>
                <p className={css.textTitlesis}>
                  {Array.from({
                    length: selectedTruck.reviews[0].reviewer_rating,
                  }).map((_, index) => (
                    <svg key={index} className={css.iconhed}>
                      <use href={`${sprite}#icon-star`} />
                    </svg>
                  ))}
                </p>
              </li>
            </ul>
          </section>
          <div className={css.textDescr}>
            <p className={css.text}>{selectedTruck.reviews[0].comment}</p>
          </div>
        </section>

        <section className={css.textContainers}>
          <section className={css.reviewBlTitle}>
            <span className={css.textDescr}>
              <p className={css.textT}>
                {selectedTruck.reviews[1].reviewer_name.charAt(0)}
              </p>
            </span>
            <ul className={css.textDescrBl}>
              <li className={css.textDescr}>
                <p className={css.textN}>
                  {selectedTruck.reviews[1].reviewer_name}
                </p>
              </li>
              <li className={css.textDescr}>
                <p className={css.textTitlesis}>
                  {Array.from({
                    length: selectedTruck.reviews[1].reviewer_rating,
                  }).map((_, index) => (
                    <svg key={index} className={css.iconhed}>
                      <use href={`${sprite}#icon-star`} />
                    </svg>
                  ))}
                </p>
              </li>
            </ul>
          </section>
          <div className={css.textDescr}>
            <p className={css.text}>{selectedTruck.reviews[1].comment}</p>
          </div>
        </section>
      </section>

      <section className={css.textContainerses}>
        <h3 className={css.textTitleTit}>{t("navigation.bokTitleFm")}</h3>
        <h4 className={css.textTitleTi}>{t("navigation.bokTitleFmText")}</h4>
        <div className={css.blocForm}>
          <BookingForm />
        </div>
      </section>
    </div>
  );
}

// reviews;
// comment;
// reviewer_name;
// reviewer_rating;
