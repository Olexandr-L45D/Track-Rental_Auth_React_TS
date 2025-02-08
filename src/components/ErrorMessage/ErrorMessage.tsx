import { Link } from "react-router-dom";
import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <>
      <p className={css.errorText}>
        Whoops, something went wrong! Try again later!
      </p>
      <p className={css.textLink}>
        Plese use this link to go Home <Link to="/">back to home</Link>
      </p>
    </>
  );
};

export default ErrorMessage;
