import css from "./Layout.module.css";
import { Suspense } from "react";
import { Props } from "../App/App.types";
import { AppBar } from "../AppBar/AppBar";

export const Layout = ({ children }: Props) => {
  return (
    <div className={css.containerLayout}>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
