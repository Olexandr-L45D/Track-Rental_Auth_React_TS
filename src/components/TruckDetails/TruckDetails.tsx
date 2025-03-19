import { useEffect, useState } from "react";
import sprite from "/images/sprite.svg";
import css from "./TruckDetails.module.css";
import { GoArrowLeft } from "react-icons/go";
import { findTruckById } from "../../redux/campers/operations";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../redux/store";
import BookingForm from "../BookingForm/BookingForm";
import ModalContainer from "../ModalContainer/ModalContainer";
import TruckFeatures from "../TruckFeatures/TruckFeatures";

const TruckDetails = (): JSX.Element => {
  const dispatch: AppThunkDispatch = useDispatch();
  const { t } = useTranslation();
  const { selectedTruck, loading, error } = useAppSelector(
    state => state.campers
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  // console.log("🚛 Отримано ID вантажівки:", id);
  if (!id) {
    return <div>No Truck ID provided</div>;
  }
  useEffect(() => {
    // console.log("🚀 Викликаємо findTruckById для ID:", id);
    dispatch(findTruckById(Number(id)));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!selectedTruck) {
    return <p>No truck details available</p>;
  }

  const slides = selectedTruck.gallery.map(({ original }) => ({
    src: original,
    alt: selectedTruck.name,
  }));

  return (
    <div className={css.container}>
      <section className={css.cartContainer}>
        <section className={css.cartComent}>
          <section className={css.cartComentHed}>
            <div className={css.titlesblok}>
              <h1 className={css.titles}>{selectedTruck.name}</h1>
            </div>

            <ul className={css.descripBloc}>
              <li className={css.descripBlo}>
                <div className={css.textTitlesis}>
                  <svg className={css.iconhed}>
                    <use href={`${sprite}#icon-star`} />
                  </svg>
                </div>
                <div className={css.loched}>
                  {selectedTruck.rating}
                  <strong className={css.loched}>(Reviews)</strong>
                </div>
              </li>
              <li className={css.textTitlesBl}>
                <div className={css.textTitlesis}>
                  <svg className={css.iconhed}>
                    <use href={`${sprite}#icon-city`} />
                  </svg>
                </div>
                <div className={css.loched}>{selectedTruck.location}</div>
              </li>
            </ul>

            <div className={css.textPriceBl}>
              <h3 className={css.textPrice}>€ {selectedTruck.price}</h3>
            </div>
          </section>
          <ul className={css.imgCardBloc}>
            {selectedTruck.gallery.map(({ thumb }, index) => (
              <li key={index} className={css.imgCard}>
                <img
                  className={css.img}
                  src={thumb}
                  alt={`${selectedTruck.name} thumbnail`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))}
          </ul>

          <div className={css.textDescr}>
            <p className={css.text}>{selectedTruck.description}</p>
          </div>

          <div className={css.blocTitleContainers}>
            <ul className={css.textTitlesBloLi}>
              <li className={css.textTitles}>
                <NavLink
                  className={({ isActive }) =>
                    `${css.navLink} ${isActive ? css.active : ""}`
                  }
                  to="features"
                >
                  {t("navigation.features")}
                </NavLink>
              </li>
              <li className={css.textTitles}>
                <NavLink
                  className={({ isActive }) =>
                    `${css.navLink} ${isActive ? css.active : ""}`
                  }
                  to="reviews"
                >
                  {t("navigation.reviews")}
                </NavLink>
              </li>
              <li className={css.textLink}>
                <button className={css.buttonIcon}>
                  <GoArrowLeft className={css.icons} />
                  <NavLink className={css.linkGo} to="/catalog">
                    {t("navigation.go_Catalog")}
                  </NavLink>
                </button>
              </li>
            </ul>
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={slides}
              index={currentIndex} // Заміна initialIndex на index
              on={{ view: ({ index }) => setCurrentIndex(index) }} // Додатково, для оновлення індексу при перегляді
            />
            <Outlet />
          </div>
          {/* {isModalOpen && (
            <ModalContainer onClose={closeModal}>
              <TruckFeatures onClose={closeModal} />
            </ModalContainer>
          )} */}
          <section className={css.textContainerses}>
            <h3 className={css.textTitleTit}>{t("navigation.bokTitleFm")}</h3>
            <h4 className={css.textTitleTi}>
              {t("navigation.bokTitleFmText")}
            </h4>
            <div className={css.blocForm}>
              <BookingForm />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default TruckDetails;
