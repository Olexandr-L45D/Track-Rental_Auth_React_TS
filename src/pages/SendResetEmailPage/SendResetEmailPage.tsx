import { useTranslation } from "react-i18next";
import css from "./SendResetEmailPage.module.css";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SendResetEmailForm from "../../components/SendResetEmailForm/SendResetEmailForm";

const SendResetEmailPage = (): JSX.Element => {
  const [isRegistering, setIsRegistering] = useState(true);
  const { t } = useTranslation();
  // const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
   const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);

  return (
    <section className={css.background}>
      <section className={css.sectinPage}>
        <div className={css.card}>
          
          <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
          <h2 className={css.cartText}>{t("navigation.titleWelcom")}</h2>
  
        </div>
        <section className={css.cartFormSection}>
  
        <div className={css.cartPage}>
            <h3 className={css.cartForm}>{t("register.titleRegistr")}</h3>
  
          {isLoggedIn && <SendResetEmailForm /> }
          </div>

          </section>
          </section>
    </section>
  );
};
   
  export default SendResetEmailPage;


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


  // можливо ця логіка в мене реалізована в формі?
  
// const ConfirmEmailPage = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token');
//   const dispatch = useDispatch();

//   const handleEmailConfirmation = async () => {
//     try {
//       await dispatch(confirmEmail({ token }));
//       setTimeout(() => {
//         navigate('/home');
//       }, 3000);
//     } catch (error) {
//       console.error(error);
//       // notifyError('Failed to confirm email. Please try again.');
//       setTimeout(() => {
//         navigate('/');
//       }, 3000);
//     }
//   };

//   useEffect(() => {
//     handleEmailConfirmation();
//   }, []);

//   return (
//     <>
//       <h1>Confirming Email...</h1>
//       <p>Please wait while we confirm your email.</p>
//     </>
//   );
// };

// export default ConfirmEmailPage;
