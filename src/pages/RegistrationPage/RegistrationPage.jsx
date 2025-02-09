import { useTranslation } from "react-i18next";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.module.css";
import css from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <div className={css.cartPage}>
        <h3 className={css.cartForm}>{t("register.titleRegistr")}</h3>
        <RegistrationForm />
      </div>
    </main>
  );
}

// RegistrationForm
