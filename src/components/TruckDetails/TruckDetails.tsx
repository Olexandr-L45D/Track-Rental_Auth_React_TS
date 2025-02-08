import { useEffect, useState } from "react";
import sprite from "../../images/sprite.svg";
import css from "./TruckDetails.module.css";
import { GoArrowLeft } from "react-icons/go";
import { findTruckById } from "../../redux/campers/operations";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useTranslation } from "react-i18next";
// import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"; // Імпортуйте нові хуки

export type TruckDetailById = {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  gallery: { original: string; thumb: string }[];
  description: string;
  reviews?: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
};

interface TruckDetailsProps {
  id: number; // Приймаємо тільки id як пропс
}
// Тепер в компоненті TruckDetails.tsx замість стандартного useDispatch, використовуйте useAppDispatch:

  const TruckDetails: React.FC = () => {
  const dispatch = useAppDispatch(); // Використовуємо типізований dispatch
  const { t } = useTranslation();
  const { selectedTruck, loading, error } = useAppSelector((state) => state.campers);
  // const dispatch = useDispatch();
  // const { t } = useTranslation();
  // const { selectedTruck, loading, error } = useSelector((state: RootState) => state.campers) as {
  //   selectedTruck: TruckDetailById | null;
  //   loading: boolean;
  //   error: string | null;
  // };
  
  const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { id } = useParams<{ id: string }>();  // id як string of useParams
    
    useEffect(() => {
     dispatch(findTruckById(Number(id)));
    // dispatch(findTruckById(id)); // Завантаження деталей вантажівки
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
        </section>
      </section>
    </div>
  );
};

export default TruckDetails;


// export type TruckDetailById = {
//   id: number;
//   name: string;
//   location: string;
//   rating: number;
//   price: number;
//   gallery: { original: string, thumb: string }[];
//   description: string;
// };

// interface TruckDetailsProps {
//   id: number;
// }
// // const TruckDetails = ( id) => {
// const TruckDetails:React.FC<TruckDetailsProps> = ( {id} ) => {
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   // const { selectedTruck, loading, error } = useSelector((state: RootState) => state.campers);
//   const { selectedTruck, loading, error } = useSelector((state: RootState) => state.campers) as {
//   selectedTruck: TruckDetailById | null;
//   loading: boolean;
//   error: string | null;
// };
//   const [open, setOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     dispatch(findTruckById(id)); // Запит на завантаження деталей вантажівки
//   }, [dispatch, id]);
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   // const slides = selectedTruck.gallery.map(({ original }) => ({
//   //   src: original,
//   //   alt: selectedTruck.name,
//   // }));

//   if (error) {
//     return <p>Error: {error}</p>;
//   }
//   if (!selectedTruck) {
//     return <p>No truck details available</p>;
//   }
//   // if (error?.status === 404) {
//   //   return <p>Truck not found</p>;
//   // }
//   const slides = selectedTruck?.gallery
//     ? selectedTruck.gallery.map(({ original }) => ({
//         src: original, // Використовуємо повнорозмірне зображення original
//         alt: selectedTruck.name,
//       })) : [];
//   return (
//     <div className={css.container}>
//       <section className={css.cartContainer}>
//         <section className={css.cartComent}>
//           <div className={css.titlesblok}>
//             <h1 className={css.titles}>{selectedTruck.name}</h1>
//           </div>

//           <ul className={css.descripBloc}>
//             <li className={css.descripBlo}>
//               <div className={css.textTitlesis}>
//                 <svg className={css.iconhed}>
//                   <use href={`${sprite}#icon-star`} />
//                 </svg>
//               </div>
//               <div className={css.loched}>
//                 {selectedTruck.rating}
//                 <strong className={css.loched}>(Revievs)</strong>
//               </div>
//             </li>
//             <li className={css.textTitlesBl}>
//               <div className={css.textTitlesis}>
//                 <svg className={css.iconhed}>
//                   <use href={`${sprite}#icon-city`} />
//                 </svg>
//               </div>
//               <div className={css.loched}>{selectedTruck.location}</div>
//             </li>
//           </ul>

//           <div className={css.textPriceBl}>
//             <h3 className={css.textPrice}>€ {selectedTruck.price}</h3>
//           </div>
//           <ul className={css.imgCardBloc}>
//             {selectedTruck.gallery.map(({ thumb }, index) => (
//               <li key={index} className={css.imgCard}>
//                 <img
//                   className={css.img}
//                   src={thumb}
//                   alt={`${selectedTruck.name} thumbnail`}
//                   onClick={() => {
//                     setCurrentIndex(index);
//                     setOpen(true);
//                   }}
//                   style={{ cursor: "pointer" }}
//                 />
//               </li>
//             ))}
//           </ul>

//           <div className={css.textDescr}>
//             <p className={css.text}>{selectedTruck.description}</p>
//           </div>
//           <div className={css.blocTitleContainers}>
//             <ul className={css.textTitlesBloLi}>
//               <li className={css.textTitles}>
//                 <NavLink
//                   className={({ isActive }) =>
//                     `${css.navLink} ${isActive ? css.active : ""}`
//                   }
//                   to="features"
//                 >
//                   {t("navigation.features")}
//                 </NavLink>
//               </li>
//               <li className={css.textTitles}>
//                 <NavLink
//                   className={({ isActive }) =>
//                     `${css.navLink} ${isActive ? css.active : ""}`
//                   }
//                   to="reviews"
//                 >
//                   {t("navigation.reviews")}
//                 </NavLink>
//               </li>
//               <li className={css.textLink}>
//                 <button className={css.buttonIcon}>
//                   <GoArrowLeft className={css.icons} />
//                   <NavLink className={css.linkGo} to="/catalog">
//                     {t("navigation.go_Catalog")}
//                   </NavLink>
//                 </button>
//               </li>
//             </ul>
//             <Lightbox
//               open={open}
//               close={() => setOpen(false)}
//               slides={slides}
//               initialIndex={currentIndex} // Правильний параметр
//             />
//             <Outlet />
//             {/* {children} Рендерим children */}
//           </div>
//         </section>
//       </section>
//     </div>
//   );
// };

// export default TruckDetails;



// // type State = {
// //   items: TruckDetailById[];
// //   loading: boolean;
// //   isFetched: boolean;
// //   error: string | null;
// //   selectedTruck: null; // Для збереження деталей вантажівки
// //   isBooked: boolean;
// //   totalpages: number;
// //   page: number;
// //   // user: User | null; на майбутнє для Юзера (авторизація)
// // };

// // Пояснення:
// // Стан компонента:
// // open: Відповідає за відкриття або закриття лайтбоксу.
// // currentIndex: Зберігає індекс поточного зображення.
// // Масив slides: Містить об'єкти з повнорозмірними зображеннями та їх описами.
// // Обробник події onClick: При натисканні на мініатюру встановлює поточний індекс та відкриває лайтбокс.
// // Компонент Lightbox: Відображає повнорозмірне зображення з можливістю перегляду інших зображень при кліку на стрілку.
// // Цей підхід забезпечує зручний перегляд зображень у лайтбоксі при натисканні на мініатюри в каталозі автомобілів.

