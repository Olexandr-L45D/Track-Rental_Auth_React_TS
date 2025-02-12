import { useTranslation } from "react-i18next";
import css from "./RegistrationPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const RegistrationPage: React.FC = () => {
  const { t } = useTranslation();
 
  return (
    <main>
      <div className={css.cartPage}>
        <h3 className={css.cartForm}>{t("register.titleRegistr")}</h3>
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegistrationPage;
