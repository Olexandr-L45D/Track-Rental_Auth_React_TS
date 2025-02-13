
import css from "./LoginForm.module.css";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

 interface UsLoginVelues { 
    email: string;
    password: string;
  }
  // Початкові значення форми
  const initialLoginValues: UsLoginVelues = {
    email: "",
    password: "",
};

export default function LoginForm(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
 
  const handleSubmit = async (values: UsLoginVelues, { setSubmitting, resetForm }: FormikHelpers<UsLoginVelues>) => {
    try {
    await dispatch(logIn(values)).unwrap(); // Додаємо .unwrap() для коректного оброблення;
    toast.success("You have successfully logged in!");
      navigate("/catalog"); // Якщо успіх - перекидаємо до каталогу
    } 
    catch (error) {
  setAttempts(prevAttempts => {
    const newAttempts = prevAttempts + 1;

    if (newAttempts >= 3) {
      navigate("/register");
      return newAttempts; // Повертаємо нове значення
    } else {
      setError(`Incorrect password or email. Attempts left: ${3 - newAttempts}`);
    }

    return newAttempts; // Повертаємо нове значення в setAttempts
  });
}
    resetForm();
  };

  return (
    <div className={css.item}>
      <ToastContainer
        position="top-right"
        autoClose={5000} // 5 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Formik
        initialValues={initialLoginValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>Email</label>
            <Field
              className={css.inp}
              type="email"
              name="email"
              placeholder="Enter login..."
            />
          </div>
          <div className={css.items}>
            <label className={css.label}>Password</label>
            <Field
              className={css.inp}
              type="password"
              name="password"
              placeholder="Enter password..."
            />
          </div>
          <div className={css.btn}>
            <button className={css.LoginForm} type="submit">
              {t("auth.btnLog")}
            </button>
          </div>
          
          {error && <p style={{ color: "red" }}>{error}</p>}
      {/* <p className={css.btn}> {t("auth.btnLogerr")} <button className={css.LoginForm} onClick={() => navigate("/register")}>{t("auth.btnLogLink")}</button></p> */}
        </Form>
      </Formik>
    </div>
  );
}
