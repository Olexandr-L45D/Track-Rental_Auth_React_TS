import css from "./ButtonLoadMore.module.css";
import { fetchAllTruck } from "../../redux/campers/operations";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AppThunkDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const ButtonLoadMore = (): JSX.Element => {
  const dispatch: AppThunkDispatch = useDispatch();
  const { page, totalpages, loading } = useAppSelector(state => state.campers);
  const { t } = useTranslation();

  const handleClick = () => {
    if (!loading && page < totalpages) {
      dispatch(fetchAllTruck({ page }));
    } else {
      console.log("No more pages to load.");
    }
  };

  return (
    <div className={css.cartBottomLoad}>
      <button
        className={css.btnSend}
        onClick={handleClick}
        disabled={loading || page >= totalpages}
      >
        {loading ? "Loading..." : t("navigation.Load")}
      </button>
    </div>
  );
};

export default ButtonLoadMore;

// const ButtonLoadMore = (): JSX.Element => {
//   const dispatch: AppThunkDispatch = useDispatch();
//   const { page, totalpages, loading } = useAppSelector(state => state.campers);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const gallery = document.querySelector(".cartAllPage");
//       if (!gallery) return;

//       const rect = gallery.getBoundingClientRect();
//       const isBottomVisible = rect.bottom <= window.innerHeight;

//       setIsVisible(isBottomVisible);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Викликаємо один раз при завантаженні

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleClick = () => {
//     if (!loading && page < totalpages) {
//       dispatch(fetchAllTruck({ page }));
//     }
//   };

//   return (
//     <div
//       className={`${css.cartBottomLoad} ${
//         isVisible ? css.visible : css.hidden
//       }`}
//     >
//       <button
//         className={css.btnSend}
//         onClick={handleClick}
//         disabled={loading || page >= totalpages}
//       >
//         {loading ? "Loading..." : "Load more"}
//       </button>
//     </div>
//   );
// };

// export default ButtonLoadMore;

// Як це працює:
// При кліку по кнопці:
// Перевіряється, чи поточна сторінка (page) менша за загальну кількість сторінок (totalpages).
// Якщо так, викликається fetchAllTruck із page + 1.
// Оновлення Redux Store:
// Нові елементи додаються до існуючих items.
// Поточна сторінка збільшується (page += 1).
// Кнопка відображається лише тоді, коли є сторінки для завантаження:
// Кнока стає неактивною, якщо поточна сторінка дорівнює totalpages.
