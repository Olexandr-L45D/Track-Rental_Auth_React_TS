import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logIn, register, setAuthHeader, UsRegisterVelues } from "../../redux/auth/operations";
import { AppDispatch, AppThunkDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setToken } from "../../redux/auth/slice";
import { selectIsLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";
// import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { useAppDispatch } from "../../redux/hooks";
// import { setToken } from "../../redux/authSlice"; // перевір правильний шлях
  const initialValues: UsRegisterVelues = {
    name: "",
    email: "",
    password: "",
};
  
export default function RegistrationForm(): JSX.Element {
  // const dispatch: AppDispatch = useDispatch();
  // const dispatch = useAppDispatch(); // ✅ ВИКОРИСТОВУЄМО `useAppDispatch`
  const isLoading = useSelector(selectIsLoading);
  const dispatch: AppThunkDispatch = useDispatch();
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
  
  const handleRegister = async (
  values: UsRegisterVelues,
  { setSubmitting, resetForm }: FormikHelpers<UsRegisterVelues>
) => {
  const trimmedValues = {
    name: values.name.trim(),
    email: values.email.trim(),
    password: values.password.trim(),
  };

  try {
    const registerResponse = await dispatch(register(trimmedValues));
    console.log("🔵 Реєстрація успішна, відповідь API:", registerResponse);
    if (registerResponse && registerResponse?.data?.data?.accessToken) {
      toast.success("You have successfully registered!");
      console.log("🟢 Отримано токен:", registerResponse.data.data.accessToken);
      // Зберігаємо токен у LocalStorage
      localStorage.setItem("token", registerResponse?.data?.data?.accessToken);
      
      // Оновлюємо стан Redux
  dispatch(setToken({
    accessToken: registerResponse?.data?.data?.accessToken,
    user: registerResponse?.data?.data?.user || {}, // якщо є користувач у відповіді
      }));
     
      // Оновлюємо сторінку або переходимо на каталог
      navigate("/catalog", { replace: true });
      
    } else {
      throw new Error("Access token is missing!");
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
              {isLoading ? <Loader /> : 'Register'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

// email
// :
// "Alina.Iva.Sidora234.LenaOl1552@gmail.com"
// name
// :
// "Anna Ivanivna"
// password
// :
// "123Sidor552g"

// email
// :
// "Alina_Sidora234.LenaOl1552@gmail.com"
// name
// :
// "Olena"
// password
// :
// "123Sidor55"


//   const handleRegister = async (values: UsRegisterVelues,
//     { setSubmitting, resetForm }: FormikHelpers<UsRegisterVelues>) => {
//     // Очищення пробілів перед відправкою
//   const trimmedValues = {
//     name: values.name.trim(),
//     email: values.email.trim(),
//     password: values.password.trim(),
//     };
//    try {
//      const registerResponse = await dispatch(register(trimmedValues)).unwrap();
//      toast.success("You have successfully registered!");
    
//   //    if (registerResponse && "payload" in registerResponse && registerResponse.payload?.data?.accessToken) {
//   // window.location.reload();
//   //    }
     
//      if (registerResponse && "payload" in registerResponse && registerResponse.payload?.accessToken) {
//   window.location.reload();
// }

//     if (registerResponse.status === 201) {
//       console.log("REGISTER SUCCESS:", registerResponse);
//       toast.success("You have successfully registered!");
//       navigate("/catalog");
//       console.log("Auth response:", registerResponse); // Перевіримо, що приходить
  
//      }
     
//     } catch (error: any) {
//     if (error.response?.status === 409) {
//       toast.error("This email is already in use. Try logging in.");
//     } else {
//       toast.error("Try again more carefully!");
//     }
//   } finally {
//     setSubmitting(false);
//     resetForm();
//   }
  //   };