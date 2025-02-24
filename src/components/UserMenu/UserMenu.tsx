
import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import { AppDispatch, AppThunkDispatch } from "../../redux/store";  // Імпорт типів
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";

  const UserMenu = (): JSX.Element => {
    // const dispatch: AppDispatch = useDispatch();
    //  const dispatch = useAppDispatch(); // ✅ ВИКОРИСТОВУЄМО `useAppDispatch`
    const dispatch: AppThunkDispatch = useDispatch();
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



// email
// : 
// "Anna.Ali.litvinenko.Lena1502@gmail.com"
// name
// : 
// "Annali"
// password
// : 
// "1234OlenjkAn"