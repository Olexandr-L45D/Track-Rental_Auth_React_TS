import css from "./TruckReviews.module.css";
import sprite from "../../images/sprite.svg";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/hooks";
import { TruckReview } from "../App/App.types";

const TruckReviews = (): JSX.Element => {
  const { selectedTruck } = useAppSelector(
    state => state.campers as { selectedTruck: TruckReview | null }
  );
  const { t } = useTranslation();

  return (
    <div className={css.cartBottomDetall}>
      {selectedTruck ? (
        <section className={css.cartComentBloks}>
          {selectedTruck.reviews.map((review, index) => (
            <section key={index} className={css.textContainers}>
              <section className={css.reviewBlTitle}>
                <div className={css.textDescr}>
                  <p className={css.textT}>{review.reviewer_name.charAt(0)}</p>
                </div>
                <ul className={css.textDescrBl}>
                  <li className={css.textDescr}>
                    <p className={css.textN}>{review.reviewer_name}</p>
                  </li>
                  <li className={css.textDescr}>
                    <p className={css.textTitlesis}>
                      {Array.from({ length: review.reviewer_rating }).map(
                        (_, starIndex) => (
                          <svg key={starIndex} className={css.iconhed}>
                            <use href={`${sprite}#icon-star`} />
                          </svg>
                        )
                      )}
                    </p>
                  </li>
                </ul>
              </section>
              <div className={css.textDescr}>
                <p className={css.text}>{review.comment}</p>
              </div>
            </section>
          ))}
        </section>
      ) : (
        <p>{t("navigation.noReviewsAvailable")}</p>
      )}
    </div>
  );
};

export default TruckReviews;
