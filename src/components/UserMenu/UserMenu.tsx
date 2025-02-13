
import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";  // Імпорт типів

  const UserMenu = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logOut());  // викликається тільки по кліку
  };

  return (
    <div className={css.wrapper}>
      <button
        className={css.button}
        onClick={handleLogout}  // додаємо обробник події
        type="button"
      >
        {t("auth.logout")}
      </button>
    </div>
  );
};

export default UserMenu;



