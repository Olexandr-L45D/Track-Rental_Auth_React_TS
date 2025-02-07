import css from "./Layout.module.css";

import { Suspense } from "react";

import { Navigation } from "../Navigation/Navigation";

export const Layout = ({ children }) => {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
