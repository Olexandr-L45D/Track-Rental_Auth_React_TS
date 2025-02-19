import { useTranslation } from "react-i18next";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";
import { useState } from "react";

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [attempts, setAttempts] = useState(0);
 
  return (
    <main>
      <div className={css.cartPage}>
        <h1 className={css.cartTitle}>{t("login.titleLogin")}</h1>
        <LoginForm attempts={attempts} setAttempts={setAttempts}/>
      </div>
    </main>
  );
};
export default LoginPage;

// const [products, setProduct] = useState([]);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);

// useEffect(() => {
//     async function fetchData() {
//         try {
//             setLoading(true);
//             setError(false);
//             // const data = await getProductMovies();
//             setProduct(data);
//             setLoading(false);
//         } catch (error) {
//             setError("Sorry Bad Login");
//         }
//     }
//     fetchData();
// }, []);
