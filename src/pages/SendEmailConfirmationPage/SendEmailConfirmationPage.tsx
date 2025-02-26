import { useTranslation } from "react-i18next";
import css from "./SendEmailConfirmationPage.module.css";
import {  useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../redux/store";
import { confirmEmail } from "../../redux/auth/operations";
// import SendResetEmailForm from "../../components/SendResetEmailForm/SendResetEmailForm";

const SendEmailConfirmationPage = (): JSX.Element => {
  const [isRegistering, setIsRegistering] = useState(true);
  const { t } = useTranslation();
  // const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get('token');
  const token = localStorage.getItem("jwt-token");
  // const dispatch = useDispatch();
  const dispatch: AppThunkDispatch = useDispatch();

  const handleEmailConfirmation = async () => {
    try {
     if (!token) {
      console.error("❌ No token found in URL!");
      return;
    }

    await dispatch(confirmEmail({ token })); // ✅ Примусове приведення до string
    setTimeout(() => {
      navigate('/catalog');
    }, 3000);
    } catch (error) {
      console.error(error);
      // notifyError('Failed to confirm email. Please try again.');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  useEffect(() => {
    handleEmailConfirmation();
  }, []);

  return (
    <>
      <h1>Confirming Email...</h1>
      <p>Please wait while we confirm your email.</p>
    </>
  );
};
   
  export default SendEmailConfirmationPage;


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
