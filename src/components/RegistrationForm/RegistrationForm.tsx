import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { register, UsRegisterVelues } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

  // Початкові значення форми
  const initialValues: UsRegisterVelues = {
    name: "",
    email: "",
    password: "",
};
  
export default function RegistrationForm(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
// Схема валідації для реєстраційної форми
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Ім’я повинно бути не менше 3 символів')
    .required('Ім’я є обов’язковим'),
  email: Yup.string()
    .email('Невірний формат електронної пошти')
    .required('Електронна пошта є обов’язковою'),
  password: Yup.string()
    .min(6, 'Пароль повинен бути не менше 6 символів')
    .required('Пароль є обов’язковим'),
});

  const handleSubmit = async (values: UsRegisterVelues,
    { setSubmitting, resetForm }: FormikHelpers<UsRegisterVelues>) => {
    // Очищення пробілів перед відправкою
  const trimmedValues = {
    name: values.name.trim(),
    email: values.email.trim(),
    password: values.password.trim(),
    };
    try {
      // Чекаємо на результат реєстрації
      await dispatch(register(trimmedValues));
      toast.success("You have successfully registered!");
      navigate("/catalog"); // Переходимо на каталог після успішної реєстрації
    } catch (error: any) {
    if (error.response?.status === 409) {
      toast.error("This email is already in use. Try logging in.");
    } else {
      toast.error("Try again more carefully!");
    }
  } finally {
    setSubmitting(false);
    resetForm();
  }
  };

  return (
    <div className={css.item}>
      <ToastContainer className="custom-toast-container"
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
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>Name</label>
            <Field
              className={css.inp}
              type="name"
              name="name"
              placeholder="Enter name..."
            />
             <ErrorMessage name="name" component="div" />
          </div>
          <div className={css.items}>
            <label className={css.label}>Email</label>
            <Field
              className={css.inp}
              type="email"
              name="email"
              placeholder="Enter email..."
            />
             <ErrorMessage name="email" component="div" />
          </div>
          <div className={css.items}>
            <label className={css.label}>Password</label>
            <Field
              className={css.inp}
              type="password"
              name="password"
              placeholder="Please enter numbers and uppercase letters..."
            />
            <ErrorMessage name="password" component="div" />
          </div>

          <div className={css.btn}>
            <button className={css.regForm} type="submit">
              {t("register.registerBtn")}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

// successful registration