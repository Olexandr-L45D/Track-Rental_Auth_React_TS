import { useTranslation } from "react-i18next";
import css from "./RegisterPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppThunkDispatch, RootState } from "../../redux/store";
import { setToken } from "../../redux/auth/slice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const RegisterPage = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Перевірка на авторизацію

  //   useEffect(() => {
  //   console.log("🟢 RegisterPage useEffect triggered");

  //   const token = localStorage.getItem("jwt-token");
  //   if (token) {
  //     console.log("📦 Loaded token from LocalStorage:", token);
  //     dispatch(setToken({ accessToken: token }));
  //   }

  //   if (isLoggedIn && location.pathname === "/register") {
  //     console.log("🚀 User is logged in! Navigating to /catalog");
  //     navigate("/catalog", { replace: true });
  //   }
  // }, [dispatch, navigate, isLoggedIn, location.pathname]);

  //   useEffect(() => {
  //   console.log("🟢 RegisterPage useEffect triggered");

  //   const token = localStorage.getItem("jwt-token");
  //   if (token) {
  //     console.log("📦 Loaded token from LocalStorage:", token);
  //     dispatch(setToken({ accessToken: token }));
  //   }

  //   if (isLoggedIn) {
  //     console.log("🚀 User is logged in! Navigating to /catalog");
  //     navigate("/catalog", { replace: true });
  //   }
  // }, [dispatch, navigate, isLoggedIn]);

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

            <RegistrationForm />
          </div>
        </section>
      </section>
    </section>
  );
};

export default RegisterPage;

// 3-й опреатор: Оператор "І" (&&)
// Якщо перше значення false, повертається воно.
// Якщо перше значення true, повертається друге.
// Якщо !isLoggedIn === true, то рендериться < RegistrationForm />.
// {!isLoggedIn && <RegistrationForm /> }
