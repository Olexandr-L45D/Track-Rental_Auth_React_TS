import css from "./Layout.module.css";
import { Suspense } from "react";
import { Navigation } from "../Navigation/Navigation";
import { Props } from "../App/App.types";


export const Layout = ({ children }: Props) => {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
