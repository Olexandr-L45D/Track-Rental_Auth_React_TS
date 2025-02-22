
import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";  // Імпорт типів
import { useNavigate } from "react-router-dom";

  const UserMenu = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate(); // ✅ Додаємо useNavigate

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/", { replace: true }); // ✅ Перенаправляємо на головну
  };

  return (
    <div className={css.logoutSwitcher}>
      <button
        className={css.activeButton}
        onClick={handleLogout}  // додаємо обробник події
        type="button"
      >
        {t("auth.logout")}
      </button>
    </div>
  );
};

export default UserMenu;



