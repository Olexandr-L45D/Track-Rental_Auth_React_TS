import { useParams } from "react-router-dom";
import css from "./TruckDetalsPage.module.css";
import TruckDetails from "../../components/TruckDetails/TruckDetails";

export default function TruckDetalsPage() {
  const { id } = useParams(); // Отримуємо id з URL
  return (
    <div className={css.container}>
      <TruckDetails id={id} />
    </div>
  );
}
