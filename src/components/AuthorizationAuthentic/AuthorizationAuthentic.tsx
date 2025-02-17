
import css from "./AuthorizationAuthentic.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SendResetEmailForm from "../SendResetEmailForm/SendResetEmailForm";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";

export default function AuthorizationAuthentic({ onClose }: { onClose?: () => void }): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);

  return (
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}> {/* Запобігає закриттю при кліку всередині модалки */}
        <section className={css.sectionPage}>
          <div className={css.card}>
            <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
            <h2 className={css.cartText}>{t("navigation.titleWelcom")}</h2>
          </div>
          <section className={css.cartFormSection}>
            <div className={css.cartPageApply}>
              <h3 className={css.cartForm}>{t("register.titleAuthen")}</h3>
              <div className={css.switchButtons}>
                <button onClick={() => navigate("/send-reset-email")}>
                  {t("register.titleEmail")}
                </button>
                <button onClick={() => navigate("/reset-pwd")}>
                  {t("register.titlePassword")}
                </button>
              </div>
              {/* Ваша форма залежно від стану */}
              {!isLoggedIn ? <SendResetEmailForm /> : <ResetPasswordForm/>}
            </div>
            {/* Кнопка закриття */}
            <button onClick={onClose} className={css.closeButton}>
              Close
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

// export default function AuthorizationAuthentic({ onClose }: { onClose?: () => void }): JSX.Element {
//   const { t } = useTranslation();
//   const [isRegister, setIsRegister] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(true);
//   const [attempts, setAttempts] = useState(0);
//   const navigate = useNavigate();
//    const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);

//    return (
   
//       <div className={css.background}>
//       <section className={css.sectinPage}>
//         <div className={css.card}>
          
//           <h1 className={css.cartTitle}>{t("navigation.titleHome")}</h1>
//           <h2 className={css.cartText}>{t("navigation.titleWelcom")}</h2>
  
//         </div>
//         <section className={css.cartFormSection}>
           
//         <div className={css.cartPageApply}>
//             <h3 className={css.cartForm}>{t("register.titleAuthen")}</h3>
            
//           <div className={css.switchButtons}>
//             <button 
//               // className={isRegistering ? css.active : ""} 
//               onClick={() => navigate("/auth/send-reset-email")}
//             >
//              {t("register.titleEmail")}
//             </button>
//             <button 
//               // className={!isRegistering ? css.active : ""} 
//               onClick={() => navigate("/auth/reset-pwd")}
//             >
//             {t("register.titlePassword")}
//             </button>
//           </div>
  
//           {isRegistering ? <SendResetEmailForm /> : <ResetPasswordForm/>}
//           </div>
//            {/* Додаємо кнопку для закриття */}
//           <button onClick={onClose} className={css.closeButton}>
//             Close
//           </button>
//           </section>
//           </section>
//     </div>

//   );
// };



      