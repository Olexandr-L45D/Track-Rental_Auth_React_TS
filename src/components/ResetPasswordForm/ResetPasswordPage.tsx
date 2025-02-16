import { useState } from "react";
import css from "./ResetPasswordPage.module.css";
import { useSearchParams } from "react-router-dom"; // Отримання токена з URL
import { resetPassword } from "../../redux/auth/operations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || ""; // Отримуємо токен з URL
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword(password, token);
        setMessage(response.message || "Password successfully reset!");
        toast.success("You have Password successfully reset!");
    } catch (error) {
      setMessage("Failed to reset password. Try again.");
    }
  };

  return (
      <div className={css.background}>
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
      <h3 className={css.cartForm}>Enter a new password</h3>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={css.button} onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
