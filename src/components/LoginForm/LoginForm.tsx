// LoginForm
import css from "./LoginForm.module.css";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 interface UsLoginVelues { 
    email: string;
    password: string;
  }
  // Початкові значення форми
  const initialLoginValues: UsLoginVelues = {
    email: "",
    password: "",
};

export default function LoginForm() {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
 
  const handleSubmit = (values: UsLoginVelues, { setSubmitting, resetForm }: FormikHelpers<UsLoginVelues>) => {
    console.log(values);
    dispatch(logIn(values));
    toast.success("You have successfully logged in!");
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
        </Form>
      </Formik>
    </div>
  );
}
