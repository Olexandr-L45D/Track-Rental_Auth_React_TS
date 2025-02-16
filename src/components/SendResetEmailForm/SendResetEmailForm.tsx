// SendResetEmailForm
import css from "./SendResetEmailForm.module.css";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { sendResetEmail } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

 interface UsEmailVelues { 
    email: string;
  }
  // Початкові значення форми
  const initialResValues: UsEmailVelues = {
    email: "",
};

export default function SendResetEmailForm(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();


  const handleSendResetEmail = async (
  values: UsEmailVelues,
   { setSubmitting, resetForm }: FormikHelpers<UsEmailVelues>
 ) => {
  const trimEmail = values.email.trim();
  try {
    await dispatch(sendResetEmail(trimEmail));
    toast.success("You have successfully reset email!");
    // Якщо в response є payload із повідомленням
   setMessage("Check your email for the reset link!");
  } catch (error) {
    setMessage("Failed to send reset email. Try again.");
    }finally {
      setSubmitting(false);
      resetForm();
    }
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
        initialValues={initialResValues}
        onSubmit={handleSendResetEmail}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>Email</label>
            <Field
              className={css.inp}
              type="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>
                          
          <div className={css.btn}>
            <button className={css.LoginForm} type="submit">
              {t("auth.btnLog")}
            </button>
          </div>
          
          {error && <p style={{ color: "red" }}>{error}</p>}
     
        </Form>
      </Formik>
    </div>
  );
};


// in BECEND:

// export const requestResetEmailSchema = Joi.object({
//     email: Joi.string().email().required(),
// });

// export const resetPasswordSchema = Joi.object({
//     password: Joi.string().required(),
//     token: Joi.string().required(),
// });

// // Controllers
// export const requestResetEmailController = async (req, res) => {
//     await requestResetToken(req.body.email);
//     res.json({
//         message: 'Reset password email was successfully sent!',
//         status: 200,
//         data: {},
//     });
// };

// export const resetPasswordController = async (req, res) => {
//     await resetPassword(req.body);
//     res.json({
//         message: 'Password was successfully reset!',
//         status: 200,
//         data: {},
//     });
// };

// export const verifyController = async (req, res) => {
//     const { token } = req.query;
//     await verifyUser(token);

//     res.json({
//         status: 200,
//         message: "User verify successfully"
//     });
// };