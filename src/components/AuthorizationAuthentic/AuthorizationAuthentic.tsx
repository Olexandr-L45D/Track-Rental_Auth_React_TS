
import css from "./AuthorizationAuthentic.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SendResetEmailForm from "../SendResetEmailForm/SendResetEmailForm";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import LoginForm from "../LoginForm/LoginForm";

export default function AuthorizationAuthentic({ onClose }: { onClose?: () => void }): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn ?? false);

  const getCurrentForm = () => {
  if (!isLoggedIn) return <LoginForm attempts={attempts} setAttempts={setAttempts} />;
  switch (window.location.pathname) {
    case "/send-reset-email":
      return <SendResetEmailForm />;
    case "/reset-pwd":
      return <ResetPasswordForm />;
    default:
      return <LoginForm attempts={attempts} setAttempts={setAttempts} />;
  }
};

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
                <button onClick={() => navigate("/login")}>
                  {/* {t("register.titlelogin")} */}
                  login
                </button>
                <button onClick={() => navigate("/send-reset-email")}>
                  {t("register.titleEmail")}
                </button>
                <button onClick={() => navigate("/reset-pwd")}>
                  {t("register.titlePassword")}
                </button>
              </div>

              {/* Відкривається форма залежно від стану описаного в функціїї СВІТЧ - {getCurrentForm()}*/}
                  {getCurrentForm()}
            </div>
            {/* Кнопка закриття всієї модалки */}
            <button onClick={onClose} className={css.closeButton}>
              Close
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};




// НАГАДУВАННЯ як працюють ЛОГІЧНІ оператори:
// Якщо isLoggedIn === false, то рендеримо LoginForm.
// Якщо залогінений (isLoggedIn === true), перевіряємо window.location.pathname:
// Якщо на сторінці /send-reset-email → показуємо SendResetEmailForm.
// Інакше (/reset-pwd або будь-який інший шлях) → ResetPasswordForm.
// приміняю описане нижче в коді таким чином: 
/* Відкривається форма залежно від стану */
                //   {!isLoggedIn 
                //  ? <LoginForm attempts={attempts} setAttempts={setAttempts} /> 
                //  : window.location.pathname === "/send-reset-email" 
                //    ? <SendResetEmailForm /> 
                //    : <ResetPasswordForm />}
// КРІМ того інши логічні оператори:

// Логічний тернарник:
// умова ? вираз_якщо_true : вираз_якщо_false

// Оператор "АБО" (||)
// Якщо перше значення true, воно повертається.
// Якщо перше значення false, повертається друге.
// const username = user.name || "Guest";

// 3-й опреатор: Оператор "І" (&&)
// Якщо перше значення false, повертається воно.
// Якщо перше значення true, повертається друге.
// Якщо isLoggedIn === true, то рендериться < Profile />.
// // isLoggedIn && <Profile />;

// 4-й Оператор "??" (Nullish Coalescing) - тобто це більше для стрінги а для буля приміняю по
// попередній оператор - Оператор "І" (&&)
// Працює як ||, але перевіряє null або undefined, а не false.
//  Якщо user.name === null або undefined, повертається "Guest".
//  const username = user.name ?? "Guest";



