import css from "./TruckPageFilters.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllTruck } from "../../redux/campers/operations";
import { selectPage } from "../../redux/campers/selectors";
import AllTruckList from "../../components/AllTruckList/AllTruckList";
import Loader from "../../components/Loader/Loader";
import SearchBoxFiltr from "../../components/SearchBoxFiltr/SearchBoxFiltr";
import { selectFilters } from "../../redux/filters/selectors";
import { useSearchParams } from "react-router-dom";
import ButtonLoadMore from "../../components/ButtonLoadMore/ButtonLoadMore";
import { setChangeFilter } from "../../redux/filters/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function TruckPageFilters() {
  // const isLoading = useSelector(state => state.campers.loading);
  const dispatch = useAppDispatch(); // Використовуємо типізований dispatch (меньше коду)
  const isLoading = useAppSelector((state) => state.campers.loading);
  const filteres = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const [params, setParams] = useSearchParams();

  // Об'єднаний useEffect
  useEffect(() => {
    const existingFilters = Object.fromEntries(params.entries());
    // Якщо URL містить параметри, а Redux-параметри порожні
    if (!Object.keys(filteres).length && Object.keys(existingFilters).length) {
      console.log("Initializing Redux with existing filters:", existingFilters);
      // dispatch(setChangeFilter(existingFilters)); // Синхронізація Redux з URL
      dispatch(setChangeFilter({ location: "" })); // Синхронізація Redux з URL { location: "" }
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
    <div className={css.cartAll}>
      <div className={css.cartAllPage}>
        <SearchBoxFiltr />
        {isLoading ? <Loader /> : <AllTruckList />}
      </div>
      <ButtonLoadMore />
    </div>
  );
};
