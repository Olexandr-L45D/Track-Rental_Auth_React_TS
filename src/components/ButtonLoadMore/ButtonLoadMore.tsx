import css from "./ButtonLoadMore.module.css";
import { fetchAllTruck } from "../../redux/campers/operations";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AppThunkDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";

   const ButtonLoadMore = (): JSX.Element => {
  // const dispatch = useAppDispatch(); // ✅ ВИКОРИСТОВУЄМО `useAppDispatch`
     //  const dispatch = useAppDispatch(); // Використовуємо типізований dispatch (меньше коду)
     const dispatch: AppThunkDispatch = useDispatch();
  const { page, totalpages, loading } = useAppSelector((state) => state.campers);
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
}

export default ButtonLoadMore;







// Як це працює:
// При кліку по кнопці:
// Перевіряється, чи поточна сторінка (page) менша за загальну кількість сторінок (totalpages).
// Якщо так, викликається fetchAllTruck із page + 1.
// Оновлення Redux Store:
// Нові елементи додаються до існуючих items.
// Поточна сторінка збільшується (page += 1).
// Кнопка відображається лише тоді, коли є сторінки для завантаження:
// Кнока стає неактивною, якщо поточна сторінка дорівнює totalpages.
