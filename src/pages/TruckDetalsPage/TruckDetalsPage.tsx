
import css from "./TruckDetalsPage.module.css";
import TruckDetails from "../../components/TruckDetails/TruckDetails";

export default function TruckDetalsPage(): JSX.Element {
  
  return (
    <div className={css.container}>
      <TruckDetails />
    </div>
  );
};
