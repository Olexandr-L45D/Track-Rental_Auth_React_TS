import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <>
      <h1>{t("login.titleLogin")}</h1>
      <h2> 404 - Not Found Page</h2>
      <p>
        Plese use this link to go Home <Link to="/">back to home</Link>
      </p>
    </>
  );
}
