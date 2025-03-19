import { useSelector } from "react-redux";
import css from "./AppBar.module.css";
import UserMenu from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";
import { RootState } from "../../redux/store";
import { Navigation } from "../Navigation/Navigation";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";

export const AppBar = (): JSX.Element => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Перевірка на авторизацію
  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

// дістаю значення з селекора selectIsLoggedIn який початково в папці redux/auth/selectors
