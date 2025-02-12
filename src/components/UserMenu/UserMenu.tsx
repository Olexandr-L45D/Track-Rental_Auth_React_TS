// UserMenu
import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";

import { AppDispatch } from "../../redux/store";  // Імпорт типів


const UserMenu: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { t } = useTranslation();

  return (
    <div className={css.wrapper}>
      
      <button
        className={css.button}
        onClick={() => dispatch(logOut())}
        type="button"
      >
        {t("auth.logout")}
      </button>
    </div>
  );
};

export default UserMenu;



