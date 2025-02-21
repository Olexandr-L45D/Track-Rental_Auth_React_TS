
import css from "./TruckDetalsPage.module.css";
import TruckDetails from "../../components/TruckDetails/TruckDetails";
import { useAppSelector } from "../../redux/hooks";
import Loader from "../../components/Loader/Loader";
import { Outlet } from "react-router-dom";

export default function TruckDetalsPage(): JSX.Element {
  const isLoading = useAppSelector((state) => state.campers.loading);

  return (
    <div className={css.container}>
       {isLoading ? <Loader /> : <TruckDetails />}
      <Outlet />
    </div>
  );
};
