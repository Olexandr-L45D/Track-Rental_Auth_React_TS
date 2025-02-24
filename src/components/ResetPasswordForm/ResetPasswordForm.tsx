import { useState } from "react";
import css from "./ResetPasswordForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch, AppThunkDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom"; // Отримання токена з URL
import { resetPassword } from "../../redux/auth/operations";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/useAppDispatch";


const ResetPasswordForm = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || ""; // Отримуємо токен з URL
  // const dispatch: AppDispatch = useDispatch();
  //  const dispatch = useAppDispatch(); // ✅ ВИКОРИСТОВУЄМО `useAppDispatch`
  const dispatch: AppThunkDispatch = useDispatch();
  const { t } = useTranslation();

  // Схема валідації
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Початкові значення
  const initialValues = { password: "" };

  // Функція обробки сабміту
  const handleResetPassword = async (
    values: { password: string },
    { setSubmitting, resetForm }: FormikHelpers<{ password: string }>
  ) => {
    try {
      await dispatch(resetPassword({ newPassword: values.password.trim(), token }));
      toast.success("You have successfully reset your password!");
      resetForm(); // Очищення форми після успішної операції
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset password. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.item}>
      <ToastContainer position="top-right" autoClose={5000} />
     
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleResetPassword}>
        {({ isSubmitting }) => (
          <Form>
            <div className={css.items}>
              <label className={css.label}>New Password</label>
              <Field className={css.inp} type="password" name="password" placeholder="Enter new password..." />
              <ErrorMessage name="password" component="div" className={css.error} />
            </div>

            <div className={css.btn}>
              <button className={css.LoginForm} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : t("auth.btnsendNewPassw")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;