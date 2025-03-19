import css from "./TruckFeaturesPage.module.css";
import { Outlet } from "react-router-dom";

import TruckFeatures from "../../components/TruckFeatures/TruckFeatures";

const TruckFeaturesPage = (): JSX.Element => {
  const handleClose = () => {
    console.error("Close to form");
  };

  return (
    <div className={css.cartPage}>
      <h3 className={css.cartForm}>TruckFeatures</h3>
      <TruckFeatures onClose={handleClose} />
      <Outlet />
    </div>
  );
};

export default TruckFeaturesPage;
