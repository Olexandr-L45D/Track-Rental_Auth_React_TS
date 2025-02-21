import { useTranslation } from "react-i18next";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";
import { useState } from "react";

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [attempts, setAttempts] = useState(0);
 
   return (
    <section className={css.background}>
      <section className={css.sectinPage}>
        <div className={css.card}>
          
          <h1 className={css.cartTitle}>Hello</h1>
          <h2 className={css.cartText}>Please log In</h2>
  
        </div>
        <section className={css.cartFormSection}>
  
        <div className={css.cartPage}>
            <h1 className={css.cartTitle}>{t("login.titleLogin")}</h1>
        <LoginForm attempts={attempts} setAttempts={setAttempts}/>
          </div>

          </section>
          </section>
    </section>
  );
};
export default LoginPage;

{/* <LoginForm attempts={0} setAttempts={() => { }} /> */}

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
