import css from "./TruckPageImages.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTruck } from "../../redux/campers/operations";
import { selectPage } from "../../redux/campers/selectors";
import Loader from "../../components/Loader/Loader";
import { useAppSelector } from "../../redux/hooks";
import { AppThunkDispatch } from "../../redux/store";
import TruckListImages from "../../components/TruckListImages/TruckListImages";
import ButtonLoadMore from "../../components/ButtonLoadMore/ButtonLoadMore";

export default function TruckPageImages(): JSX.Element {
  const dispatch: AppThunkDispatch = useDispatch();
  const isLoading = useAppSelector(state => state.campers.loading);
  const page = useSelector(selectPage);

  useEffect(() => {
    if (page === 1) {
      dispatch(fetchAllTruck({ page }));
    }
  }, [dispatch, page]);

  return (
    <div className={css.cartAll}>
      <div className={css.cartAllPage}>
        {isLoading ? <Loader /> : <TruckListImages />}
      </div>
      <ButtonLoadMore />
    </div>
  );
}
