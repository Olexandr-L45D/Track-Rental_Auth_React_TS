// UserMenu
import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
// import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";

export default function UserMenu() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <div className={css.wrapper}>
      {/* <p className={css.username}>
        {t("auth.welcome")}, {user.name}
      </p> */}
      <button
        className={css.button}
        onClick={() => dispatch(logOut())}
        type="button"
      >
        {t("auth.logout")}
      </button>
    </div>
  );
}
