import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logIn, register, UsRegisterVelues } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
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
    .min(3, "Min 3 chars")
    .required("Name is Required"),
  email: Yup.string()
    .email("Invalid email")
    .required(" Email is Required"),
  password: Yup.string()
    .min(6, "Min 6 chars")
    .required(" Password is Required"),
});

  const handleRegister = async (values: UsRegisterVelues,
    { setSubmitting, resetForm }: FormikHelpers<UsRegisterVelues>) => {
    // Очищення пробілів перед відправкою
  const trimmedValues = {
    name: values.name.trim(),
    email: values.email.trim(),
    password: values.password.trim(),
    };
   try {
    const registerResponse = await dispatch(register(trimmedValues)).unwrap();

    if (registerResponse.status === 201) {
      console.log("REGISTER SUCCESS:", registerResponse);
        toast.success("You have successfully registered!");
      // Після реєстрації одразу виконуємо логін
      const loginResponse = await dispatch(
        logIn({ email: values.email, password: values.password })).unwrap();
      if (loginResponse.status === 200) {
        console.log("LOGIN SUCCESS:", loginResponse);
        console.log("🔥 REDIRECTING TO CATALOG...");
        // Якщо цей лог не з’явиться в консолі, значить, navigate("/catalog") взагалі не виконується
        navigate("/catalog"); // або будь-яка інша сторінка після логіну
      }
    }
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
        onSubmit={handleRegister}
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
             <ErrorMessage name="name" component="div" className={css.errorMessage} />
          </div>
          <div className={css.items}>
            <label className={css.label}>Email</label>
            <Field
              className={css.inp}
              type="email"
              name="email"
              placeholder="Enter email..."
            />
            <ErrorMessage name="email" component="div" className={css.errorMessage} />
          </div>
          <div className={css.items}>
            <label className={css.label}>Password</label>
            <Field
              className={css.inp}
              type="password"
              name="password"
              placeholder="Please enter a strong password..."
            />
            <ErrorMessage name="password" component="div" className={css.errorMessage} />
          </div>

          <div className={css.btn}>
            <button className={css.regForm} type="submit">
              {t("navigation.register")}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};



