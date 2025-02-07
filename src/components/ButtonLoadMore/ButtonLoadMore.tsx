import css from "./ButtonLoadMore.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTruck } from "../../redux/campers/operations";
import { useTranslation } from "react-i18next";

export default function ButtonLoadMore() {
  const dispatch = useDispatch();
  const { page, totalpages, loading } = useSelector(state => state.campers);

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

// Як це працює:
// При кліку по кнопці:
// Перевіряється, чи поточна сторінка (page) менша за загальну кількість сторінок (totalpages).
// Якщо так, викликається fetchAllTruck із page + 1.
// Оновлення Redux Store:
// Нові елементи додаються до існуючих items.
// Поточна сторінка збільшується (page += 1).
// Кнопка відображається лише тоді, коли є сторінки для завантаження:
// Кнока стає неактивною, якщо поточна сторінка дорівнює totalpages.
