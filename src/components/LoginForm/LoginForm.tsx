import css from "./LoginForm.module.css";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import { AppDispatch, AppThunkDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Loader from "../Loader/Loader";
import { selectIsLoading } from "../../redux/auth/selectors";
import ModalContainer from "../ModalContainer/ModalContainer";
import SendResetEmailForm from "../SendResetEmailForm/SendResetEmailForm";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- Стан модального вікна
  const isLoading = useSelector(selectIsLoading);
  const dispatch: AppThunkDispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // Схема валідації для реєстраційної форми
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required(" Email is Required"),
    password: Yup.string()
      .min(6, "Min 6 chars")
      .required(" Password is Required"),
  });

  const handleLogin = (
    values: UsLoginVelues,
    { resetForm }: FormikHelpers<UsLoginVelues>
  ) => {
    const trimmedValues = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    dispatch(logIn(trimmedValues));

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
        validationSchema={validationSchema}
        initialValues={initialLoginValues}
        onSubmit={handleLogin}
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
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage}
          />

          <div className={css.items}>
            <label className={css.label}>Password</label>
            <div className={css.passwordWrapper}>
              <Field
                className={css.inpPas}
                type={showPassword ? "text" : "password"} // <-- Міняємо тип поля  при натисканні - відображаю пароль
                name="password"
                placeholder="Please enter a strong password..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className={css.togglePasswordBtn}
              >
                {showPassword ? (
                  <FaEyeSlash className={css.inpicon} size={18} />
                ) : (
                  <FaEye className={css.inpicon} size={18} />
                )}
              </button>
            </div>
          </div>

          <ErrorMessage
            name="password"
            component="div"
            className={css.errorMessage}
          />

          <div className={css.btn}>
            <button className={css.LoginForm} type="submit">
              {isLoading ? <Loader /> : t("auth.btnLog")}
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Formik>
      <div className={css.btnBlokBot}>
        <div className={css.LoginBtnGoogle}>
          <GoogleLoginButton>Sign In with Google</GoogleLoginButton>
        </div>

        <button className={css.LoginForm} type="button">
          <Link to="/logout" className={css.link}>
            {t("register.titleLogout")}
          </Link>
        </button>

        <button className={css.LoginForm} type="button">
          <span className={css.forgotPwd} onClick={openModal}>
            {t("register.titleEmail")}
          </span>
        </button>
      </div>
      {isModalOpen && (
        <ModalContainer onClose={closeModal}>
          <SendResetEmailForm onClose={closeModal} />
        </ModalContainer>
      )}
    </div>
  );
}

// interface LoginFormProps {
//   attempts: number;
//   setAttempts: React.Dispatch<React.SetStateAction<number>>;
// }
// export default function LoginForm({
//   attempts,
//   setAttempts,
// }: LoginFormProps): JSX.Element {

// const handleSubmit = async (
//   values: UsLoginVelues,
//   { setSubmitting, resetForm }: FormikHelpers<UsLoginVelues>
// ) => {
//   try {
//     await dispatch(logIn(values));
//     toast.success("You have successfully logged in!");
//     console.log("✅ Login successful! Forcing re-render...");
//     forceUpdate(); // ✅ Примусовий ре-рендер  (в звязку з тим що в мене в АПП роути з функцією)
//     navigate("/catalog", { replace: true });
//   } catch (error) {
//     const newAttempts = attempts + 1;
//     setAttempts(newAttempts);

//     if (newAttempts >= 3) {
//       console.log(
//         "Too many failed login attempts, redirecting to /register..."
//       );
//       toast.error(
//         "Too many failed login attempts. Redirecting to registration."
//       );
//       setTimeout(() => {
//         navigate("/register");
//       }, 500); // Невелика затримка перед редіректом
//     } else {
//       setError(
//         `Incorrect email or password. Attempts left: ${3 - newAttempts}`
//       );
//     }
//   }
//   resetForm();
// };

// const [, forceUpdate] = useReducer(x => x + 1, 0);
// useEffect(() => {
//   if (attempts >= 3) {
//     // Використовуємо setTimeout для затримки редіректу
//     setTimeout(() => {
//       console.log("Navigating to /register");
//       navigate("/register");
//     }, 500); // Затримка в 300 мс
//   }
// }, [attempts, navigate]);

//  Реакт-ТайпСкрипт очікує пропси тому підкреслювало в АПП - я додав в сам РОУТ але якщо не працює то треба передати в сам ЛОГІН-Форм в аргументах
// так як має працювати лічильник спроб авторизаціїї до 3 -х разів і якщо ні то перекидати на регістрацію
// export default function LoginForm({
//   attempts = 0,
//   setAttempts = () => {}
// }: LoginFormProps): JSX.Element {

// Було так без стрілочної функціїї як пропс в аргументах:
// export default function LoginForm({ attempts, setAttempts }: LoginFormProps): JSX.Element {

// useEffect(() => {
//   console.log("Checking attempts in useEffect:", attempts);
//   if (attempts >= 3) {
//     console.log("Navigating to /register");
//     setTimeout(() => navigate("/register"), 0);
//   }
// }, [attempts, navigate]);

// setAttempts(prev => {
//   const newAttempts = prev + 1;
//   if (newAttempts >= 3) {
//     console.log("Setting attempts to 3, triggering redirect...");
//     setTimeout(() => navigate("/register"), 0);
//   }
//   return newAttempts;
// });

// export default function LoginForm(): JSX.Element {
//   const dispatch: AppDispatch = useDispatch();
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [attempts, setAttempts] = useState(0);

//  // Перевіряємо, якщо спроб більше 3 -> редірект на реєстрацію
//   useEffect(() => {
//     console.log("Attempts:", attempts); // Додаю ЛОГ для перевірки лічильника
//     if (attempts >= 3) {
//       // navigate("/register");
//       console.log("Navigating to /register");
//     setTimeout(() => {
//       navigate("/register");
//     }, 0);
//     }
//   }, [attempts, navigate]);

//   const handleSubmit = async (
//   values: UsLoginVelues,
//   { setSubmitting, resetForm }: FormikHelpers<UsLoginVelues>
// ) => {
//   try {
//     await dispatch(logIn(values)).unwrap();
//     toast.success("You have successfully logged in!");
//     navigate("/catalog");
//   } catch (error) {
//     setAttempts(prev => prev + 1); // 🔹 Просто збільшуємо лічильник

//     if (attempts + 1 < 3) {
//       setError(`Incorrect password or email. Attempts left: ${3 - (attempts + 1)}`);
//     }
//   }
//   resetForm();
// };
