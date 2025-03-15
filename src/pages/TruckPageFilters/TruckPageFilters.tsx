import css from "./TruckPageFilters.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTruck } from "../../redux/campers/operations";
import { selectPage } from "../../redux/campers/selectors";
import AllTruckList from "../../components/AllTruckList/AllTruckList";
import Loader from "../../components/Loader/Loader";
import SearchBoxFiltr from "../../components/SearchBoxFiltr/SearchBoxFiltr";
import { selectFilters } from "../../redux/filters/selectors";
import { useSearchParams } from "react-router-dom";
import ButtonLoadMore from "../../components/ButtonLoadMore/ButtonLoadMore";
import { setChangeFilter } from "../../redux/filters/slice";
import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AppThunkDispatch } from "../../redux/store";

export default function TruckPageFilters(): JSX.Element {
  const dispatchset = useAppDispatch(); // Використовуємо типізований dispatch (меньше коду)
  const dispatch: AppThunkDispatch = useDispatch();
  const isLoading = useAppSelector(state => state.campers.loading);
  const filteres = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const existingFilters = Object.fromEntries(params.entries());

    if (!Object.keys(filteres).length && Object.keys(existingFilters).length) {
      // Якщо URL містить параметри, а Redux-параметри порожні
      console.log("Initializing Redux with existing filters:", existingFilters);

      dispatchset(setChangeFilter({ location: "" })); // Синхронізація Redux з URL { location: "" }
      return;
    }
    // Оновлення URL при зміні фільтрів
    const newParams = new URLSearchParams(params.toString());
    Object.entries(filteres).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });

    if (newParams.toString() !== params.toString()) {
      console.log("Updated URL params:", newParams.toString());
      setParams(newParams);
      console.log("URL Params:", params);
    }
  }, [params, filteres, dispatch, setParams]);

  useEffect(() => {
    if (page === 1) {
      dispatch(fetchAllTruck({ page }));
    }
  }, [dispatch, page, filteres]);

  return (
    <div className={css.container}>
      <div className={css.cartAllPage}>
        <SearchBoxFiltr />
        {isLoading ? <Loader /> : <AllTruckList />}
      </div>
      <ButtonLoadMore />
    </div>
  );
}
