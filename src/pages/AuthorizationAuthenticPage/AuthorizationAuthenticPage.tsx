import { useTranslation } from "react-i18next";
import css from "./AuthorizationAuthenticPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AuthorizationAuthenticPage = (): JSX.Element => {
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
  
          {!isLoggedIn && <RegistrationForm /> }
          </div>

          </section>
          </section>
    </section>
  );
};
   
  export default AuthorizationAuthenticPage;


// остання вдала регістрація:
//   email
// :
// "A.litvinenko.alena1502@gmail.com"
// name
// :
// "Olena"
// password
// :
// "AL123LI45"

// Це обєкт вітповіді:
// {
//     "status": 201,
//     "message": "Successfully registered a user!",
//     "data": {
//         "name": "Olena",
//         "email": "A.litvinenko.alena1502@gmail.com",
//         "verify": false,
//         "_id": "67b438c18a4413e1ba2fda32",
//         "createdAt": "2025-02-18T07:37:37.970Z",
//         "updatedAt": "2025-02-18T07:37:37.970Z"
//     }
// }


// //
// {
//   "name": "Olenaka",
//   "email": "Al.litvinenko.alena1502@gmail.com",
//   "password": "1234Olena"
// }
// Нова проба регістрації
// {
//   "name": "Olenka",
//   "email": "Olena.alena1502@gmail.com",
//   "password": "1234Olena"
// }

// {
//     "status": 201,
//     "message": "Successfully registered a user!",
//     "data": {
//         "name": "Aleksandr",
//         "email": "litvinenko1947@gmail.com",
//         "verify": false,
//         "_id": "67b46d2f9347e72c800fe878",
//         "createdAt": "2025-02-18T11:21:19.653Z",
//         "updatedAt": "2025-02-18T11:21:19.653Z"
//     }
// }

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
