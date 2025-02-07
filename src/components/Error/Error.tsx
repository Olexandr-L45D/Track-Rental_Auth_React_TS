import { Link } from "react-router-dom";
import css from "./Error.module.css";

export default function Error({ children }) {
  return (
    <div className={css.textblok}>
      <p className={css.text}>
        <b>{children}</b>
      </p>
      <p className={css.textLink}>
        Plese use this link to go Home <Link to="/">back to home</Link>
      </p>
    </div>
  );
}
