// UserMenu
import css from "./UserMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";

import { AppDispatch, RootState } from "../../redux/store";  // Імпорт типів

// Типізація даних користувача
interface UserData {
  name: string;
  email: string;
  token?: string;  // Якщо токен також повертається
}

const UserMenu: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  // Типізація селектора користувача
  // const user: UserData | null = useSelector((state: RootState) => selectUser(state));

  const { t, ready } = useTranslation();

  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className={css.wrapper}>
      {/* <p className={css.username}>
        {t("auth.welcome")}, {user ? user.name : 'Guest'}
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
};

export default UserMenu;


// const UserMenu: React.FC =() => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const { t, ready } = useTranslation();
//   if (!ready) {
//     return <div>Loading translations...</div>;
//   }
//   return (
//     <div className={css.wrapper}>
//       <p className={css.username}>
//         {t("auth.welcome")}, {user.name}
//       </p>
//       <button
//         className={css.button}
//         onClick={() => dispatch(logOut())}
//         type="button"
//       >
//         {t("auth.logout")}
//       </button>
//     </div>
//   );
// };

// export default UserMenu;
