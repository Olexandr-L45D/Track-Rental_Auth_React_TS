import { useTranslation } from "react-i18next";
import css from "./ResetPasswordPage.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const ResetPasswordPage = (): JSX.Element => {
  const [isRegistering, setIsRegistering] = useState(true);
  const { t } = useTranslation();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isLoggedIn ?? false
  );

  return (
    <section className={css.container}>
      <section className={css.sectinPage}>
        <div className={css.card}>
          <h1 className={css.cartTitle}>{t("register.titleHello")}</h1>
          <h2 className={css.cartText}>{t("register.textDescrip")}</h2>
        </div>
        <section className={css.cartFormSection}>
          <div className={css.cartPage}>
            <h3 className={css.cartForm}>{t("register.titleResetPass")}</h3>
            <ResetPasswordForm />
          </div>
        </section>
      </section>
    </section>
  );
};

export default ResetPasswordPage;

// кнопка перемикання не потрібна так як я залишив тільки форму логіну!
// <div className={css.switchButtons}>
//   <button onClick={() => navigate("/register")}>
//       {t("navigation.register")}
//   </button>
// </div>

// 3-й опреатор: Оператор "І" (&&)
// Якщо перше значення false, повертається воно.
// Якщо перше значення true, повертається друге.
// Якщо !isLoggedIn === true, то рендериться < RegistrationForm />.
// {!isLoggedIn && <RegistrationForm /> }

//  <div className={css.background}>
//     <section className={css.card}>
//       <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
//       <h3 className={css.cartText}>{t("navigation.titleWelcom")}</h3>
//       <section className={css.cartBtn}>

//     <button onClick={() => setShowAuth(true)}>Identify Yourself</button>

//     {/* Відображаємо AuthNav тільки після натискання кнопки */}
//     {/* {showAuth && <AuthNav />} */}
//         {/* <Link to="/catalog">
//           <div className={css.buttonViews}>
//             <button className={css.btnVie} type="submit">
//               {t("navigation.View")}
//             </button>
//           </div>
//         </Link> */}
//       </section>
//     </section>
//   </div>
