import { useTranslation } from "react-i18next";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <div className={css.cartPage}>
        <h1 className={css.cartTitle}>{t("login.titleLogin")}</h1>
        <LoginForm />
      </div>
    </main>
  );
}

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
