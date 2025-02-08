import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";
// Розширюємо вбудований тип до RotatingLines
type RotatingLinesProps = React.ComponentProps<typeof RotatingLines>;
type CustomRotatingLinesProps = RotatingLinesProps & {
  height?: string;
};

export default function Loader() {
  const loaderProps: CustomRotatingLinesProps = {
    visible: true,
    height: "96",
    width: "96",
    strokeColor: "#407bff",
    strokeWidth: "5",
    animationDuration: "0.75",
    ariaLabel: "rotating-lines-loading",
  };

  return (
    <div className={css.loaderContainer}>
      <section className={css.loader}>
        <RotatingLines {...loaderProps} />
      </section>
    </div>
  );
}

