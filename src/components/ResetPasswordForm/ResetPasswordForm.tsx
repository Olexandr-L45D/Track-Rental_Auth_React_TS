import { useState } from "react";
import css from "./ResetPasswordForm.module.css";
import sprite from "../../images/sprite.svg";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch, AppThunkDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom"; // Отримання токена з URL
import { resetPassword } from "../../redux/auth/operations";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Loader from "../Loader/Loader";
import { selectIsLoading } from "../../redux/auth/selectors";
import { setToken } from "../../redux/auth/slice";


const ResetPasswordForm = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || ""; // Отримуємо токен з URL
  // const dispatch: AppDispatch = useDispatch();
  //  const dispatch = useAppDispatch(); // ✅ ВИКОРИСТОВУЄМО `useAppDispatch`
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };
  // Схема валідації
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password field must be filled'),
    token: Yup.string().required(), // ✅ Додаємо token, щоб він був обов'язковим
  });

  // Початкові значення було тільки пароль
  // const initialValues = { password: "" };

   const initialValues = {
    password: '',
    repeatPassword: '',
    token,
  };

  // Функція обробки сабміту
  const handleResetPassword = async (
    values: { password: string, repeatPassword: string, token: string  },
    { setSubmitting, resetForm }: FormikHelpers<{ password: string, repeatPassword: string, token: string  }>
  ) => {
    try {
     const response = await dispatch(resetPassword({ newPassword: values.password.trim(), token: values.token }));

      if (response.payload?.token) { // Якщо бекенд повертає новий токен
      dispatch(setToken({ accessToken: response.payload.token })); // Зберігаємо в Redux
      navigate('/catalog'); // ✅ Автоматично перекидаємо в каталог
    } else {
      navigate('/login'); // Якщо токен не повернули — на логін
    }

      toast.success("You have successfully reset your password!");
      // resetForm(); // Очищення форми після успішної операції
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset password. Try again.");
    } finally {
      setSubmitting(false);
    }
    resetForm(); // Очищення форми після успішної операції
  };

  return (
    <div className={css.item}>
      <ToastContainer position="top-right" autoClose={5000} />
     
      <Formik initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}>
        
               {({ errors, touched }) => (
            <Form className={css.form} autoComplete="off">
              <h2 className={css.title}>Reset password</h2>
              <label className={css.label}>
                <p className={css.text}>Enter your new password</p>
                <div className={css.inputContainer}>
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={
                      errors.password && touched.password
                        ? `${css.input} ${css.inputError}`
                        : css.input
                    }
                  />
                  <svg
                    className={css.icon}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleShowPassword();
                    }}
                  >
                    {showPassword ? (
                      <use href={`${sprite}#icon-eye`} />
                    ) : (
                      <use href={`${sprite}#icon-eye-hidden`} />
                    )}
                  </svg>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </label>

              <label className={css.label}>
                <p className={css.text}>Repeat your new password</p>
                <div className={css.inputContainer}>
                  <Field
                    name="repeatPassword"
                    type={showRepeatPassword ? 'text' : 'password'}
                    placeholder="Repeat password"
                    className={
                      errors.repeatPassword && touched.repeatPassword
                        ? `${css.input} ${css.inputError}`
                        : css.input
                    }
                  />

                  <svg
                    className={css.icon}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleShowRepeatPassword();
                    }}
                  >
                    {showRepeatPassword ? (
                      <use href={`${sprite}#icon-eye`} />
                    ) : (
                      <use href={`${sprite}#icon-eye-hidden`} />
                    )}
                  </svg>
                </div>
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
                  className={css.error}
                />
              </label>

              <button type="submit" className={css.button}>
                {isLoading ? <Loader /> : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    
  );
};
        

export default ResetPasswordForm;



// return (
//     <div className={css.item}>
//       <ToastContainer position="top-right" autoClose={5000} />
     
//       <Formik initialValues={initialValues}
//         validationSchema={validationSchema}
          //         onSubmit={handleResetPassword}>
        

        
        
//         {({ isSubmitting }) => (
//           <Form>
//             <div className={css.items}>
//               <label className={css.label}>New Password</label>
//               <Field className={css.inp} type="password" name="password" placeholder="Enter new password..." />
//               <ErrorMessage name="password" component="div" className={css.error} />
//             </div>

//             <div className={css.btn}>
//               <button className={css.LoginForm} type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? "Resetting..." : t("auth.btnsendNewPassw")}
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
  
// };





// доробити компонент ResetPasswordForm (додати repeatPassword)

// const registerSchema = yup.object({
//   password: yup
//     .string()
//     .min(8, 'Password must be at least 8 characters length')
//     .max(64)
//     .matches(/^[^\s]*$/, 'Password should not contain spaces.')
//     .required('Password is required'),
//   repeatPassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm password field must be filled'),
// });

// const RecoveryForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token');

//   const isLoading = useSelector(selectIsLoading);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showRepeatPassword, setShowRepeatPassword] = useState(false);

//   const toggleShowPassword = () => {
//     setShowPassword((prevState) => !prevState);
//   };
//   const toggleShowRepeatPassword = () => {
//     setShowRepeatPassword((prevState) => !prevState);
//   };

//   const initialValues = {
//     password: '',
//     repeatPassword: '',
//     token,
//   };

//   async function handleSubmit(values, actions) {
//     try {
//       await dispatch(
//         resetPassword({ token: values.token, password: values.password }),
//       );
//       actions.resetForm();
//       navigate('/signin');
//     } catch (error) {
//       notifyError(error.message);
//     }
//   }

//   return (
//     <>
//       <div className={css.formContainer}>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={registerSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ errors, touched }) => (
//             <Form className={css.form} autoComplete="off">
//               <h2 className={css.title}>Reset password</h2>
//               <label className={css.label}>
//                 <p className={css.text}>Enter your new password</p>
//                 <div className={css.inputContainer}>
//                   <Field
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Password"
//                     className={
//                       errors.password && touched.password
//                         ? `${css.input} ${css.inputError}`
//                         : css.input
//                     }
//                   />
//                   <svg
//                     className={css.icon}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       toggleShowPassword();
//                     }}
//                   >
//                     {showPassword ? (
//                       <use href={`${sprite}#icon-eye`} />
//                     ) : (
//                       <use href={`${sprite}#icon-eye-hidden`} />
//                     )}
//                   </svg>
//                 </div>
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className={css.error}
//                 />
//               </label>

//               <label className={css.label}>
//                 <p className={css.text}>Repeat your new password</p>
//                 <div className={css.inputContainer}>
//                   <Field
//                     name="repeatPassword"
//                     type={showRepeatPassword ? 'text' : 'password'}
//                     placeholder="Repeat password"
//                     className={
//                       errors.repeatPassword && touched.repeatPassword
//                         ? `${css.input} ${css.inputError}`
//                         : css.input
//                     }
//                   />

//                   <svg
//                     className={css.icon}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       toggleShowRepeatPassword();
//                     }}
//                   >
//                     {showRepeatPassword ? (
//                       <use href={`${sprite}#icon-eye`} />
//                     ) : (
//                       <use href={`${sprite}#icon-eye-hidden`} />
//                     )}
//                   </svg>
//                 </div>
//                 <ErrorMessage
//                   name="repeatPassword"
//                   component="div"
//                   className={css.error}
//                 />
//               </label>

//               <button type="submit" className={css.button}>
//                 {isLoading ? <Loader /> : 'Reset Password'}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

// export default RecoveryForm;
