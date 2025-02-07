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

export default function TruckPageFilters() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.campers.loading);
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

  // Завантаження вантажівок версія - яка працює наразі
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
}

// попередня версія
// const existingFilters = Object.fromEntries(params.entries());
// // Синхронізація Redux-фільтрів із URL
// console.log("Dispatching to Redux:", existingFilters); // Діагностика (тимчасово)
// // console.log("Current filters in Redux:", filteres);
// if (JSON.stringify(existingFilters) !== JSON.stringify(filteres)) {
//   dispatch(setChangeFilter(existingFilters));
//   return;
// }

// Оновлення URL при зміні фільтрів і Якщо URL-параметри порожні, їх потрібно додати:
// const newParams = new URLSearchParams();
// Object.entries(filteres).forEach(([key, value]) => {
//   if (value) newParams.set(key, value);
// });

// console.log("Updated URL params:", newParams.toString());
// setParams(newParams);
// {
//   isLoading && <Loader />;
// }
// <AllTruckList />;
// export default function TruckPageFilters() {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(state => state.campers.loading);
//   const filteres = useSelector(selectFilters);
//   const page = useSelector(selectPage);
//   const [params, setParams] = useSearchParams();

//   // Синхронізація Redux-фільтрів із URL - add new first useEffect(()
//   useEffect(() => {
//     const existingFilters = Object.fromEntries(params.entries());
//     dispatch(setChangeFilter(existingFilters));
//   }, [params, dispatch]);

//   // Оновлення URL при зміні фільтрів
//   useEffect(() => {
//     const newParams = new URLSearchParams(params.toString());
//     Object.entries(filteres).forEach(([key, value]) => {
//       if (value) newParams.set(key, value);
//       else newParams.delete(key);
//     });
//     setParams(newParams);
//   }, [filteres, params, setParams]);

//   // Завантаження вантажівок
//   useEffect(() => {
//     dispatch(fetchAllTruck({ page }));
//   }, [dispatch, page, filteres]);

//   return (
//     <div className={css.cartAll}>
//       <div className={css.cartAllPage}>
//         <SearchBoxFiltr />
//         {isLoading && <Loader />}
//         <AllTruckList />
//       </div>
//       <ButtonLoadMore />
//     </div>
//   );
// }

// useEffect(() => {
//   if (filteres && Object.keys(filteres).length > 0) {
//     dispatch(fetchAllTruck({ page, filters: filteres }));
//   } else if (page === 1) {
//     dispatch(fetchAllTruck({ page }));
//   }
// }, [dispatch, page, filteres]);

// export default function TruckPageFilters() {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(state => state.campers.loading);
//   const filteres = useSelector(selectFilters);
//   const page = useSelector(selectPage); // Додано  selectPage
//   const [params, setParams] = useSearchParams();

//   // Оновлення URL при зміні фільтрів
//   useEffect(() => {
//     const newParams = new URLSearchParams(params.toString());
//     Object.entries(filteres).forEach(([key, value]) => {
//       if (value) newParams.set(key, value);
//       else newParams.delete(key);
//     });
//     setParams(newParams);
//   }, [filteres, params, setParams]);

//   // useEffect(() => {
//   //   const newParams = new URLSearchParams(params.toString());
//   //   newParams.set("filter", filteres);
//   //   setParams(newParams);
//   // }, [filteres, params.toString(), setParams]); // Порівнюється саме строкове значення
//   // Виклик запиту після зміни `page` чи `filteres`

//   useEffect(() => {
//     if (page === 1) {
//       dispatch(fetchAllTruck({ page }));
//     }
//   }, [dispatch, page, filteres]);

//   return (
//     <div className={css.cartAll}>
//       <div className={css.cartAllPage}>
//         <SearchBoxFiltr />
//         {isLoading && <Loader />}
//         <AllTruckList />
//       </div>
//       <ButtonLoadMore />
//     </div>
//   );
// }

// params.set("", filteres);
// setParams(params);

// додатково мемоізувати функцію setParams:
// const stableSetParams = useCallback(setParams, [setParams]);
// useEffect(() => {
//   const newParams = new URLSearchParams(params);
//   newParams.set("filter", filteres);
//   stableSetParams(newParams);
// }, [filteres, params, stableSetParams]);

// приклад нижче без мемоізації setParams
//  <ButtonLoadMore />;
// ButtonLoadMore
// function handleLoadMore() {   // функція при події клік на кнопці- додавання нових порцій сторінок(збільшую знач page на один, відключаю кнопку, після запиту на сервер відмаловуємо розмітку і включаю як прийшов позитивний результат)
//       params.page += 1;
//       disable(refs.loadMoreBtn, refs.spinnerText);

//       setTimeout(async () => {try {
//        const data = await getAsyncImage(searchText);

//         renderGalleryMarkap(data.hits);
//        const galleryItemScrol = document.querySelector('.gallery-item');
//        const cardHeight = galleryItemScrol.getBoundingClientRect().height;
//         window.scrollBy({                                                 // вставляю window.scrollBy після того як вставив в дом зображення
//           top: cardHeight * 2,
//           behavior: "smooth",
//         });
//         show(refs.spinnerText);
//        } catch(error) {
//          console.log(error);
//          handlerErrorUzer(error);
//        }
//          finally {
//           enable(refs.loadMoreBtn, refs.spinnerText);
//           if (params.page === maxStoriges) {

//                   iziToast.error({
//                     title: 'Error',
//                     message: "We're sorry, but you've reached the end of search results.",
//                   });
//                   refs.loadMoreBtn.removeEventListener("click", handleLoadMore);
//                   hiden(refs.loadMoreBtn); hiden(refs.spinnerText);
//                 }
//          }}, 500); // затримка сеттаймаутом setTimeout на 0,5 секунди
//        } ;

//  це зверху були хуки
// const filteres = useSelector(selectFilteredItems); // міняю на selectOutCampers
// const [allTrucks, setAllTrucks] = useState([]); // Всі вантажівки
// const [filteredTrucks, setFilteredTrucks] = useState([]); // Фільтровані вантажівки
// const trucks = useSelector(state => state.campers.items); // Приклад вибірки з Redux
// const isFetched = useSelector(state => state.campers.isFetched); // Флаг стану
// const filteres = useSelector(state => state.filters);

// console.log("Filters-state:", filteres); це була первірка видавала раніше пустий масив
// const [params] = useSearchParams();
// const owner = params.get("owner") ?? "";

//  це були Юзефекти (які прибрав і скоротив)
// useEffect(() => {
//   async function fetchData() {
//     try {
//       if (!isFetched) {
//         // const data = await dispatch(fetchAllTruck()).unwrap();
//         const data = await dispatch(fetchAllTruck()).unwrap();
//         setAllTrucks(data); // Зберігаємо всі вантажівки
//         setFilteredTrucks(data); // Встановлюємо початковий стан для фільтрації
//       }
//     } catch (error) {
//       if (error.response?.status === 429) {
//         console.error("Rate limit exceeded, retrying...");
//         setTimeout(() => {
//           fetchData(); // Викликаємо функцію повторно через 5 секунд
//         }, 5000);
//       } else {
//         console.error("Error loading data...", error);
//       }
//     }
//   }

//   fetchData();
// }, [dispatch, isFetched, owner]);

// Фільтрація даних

// useEffect(() => {
//   if (!filteres || allTrucks.length === 0) return; // Перевіряємо, чи є дані для фільтрації

//   const filtered = allTrucks.filter(truck => {
//     const matchesLocation = filteres.location
//       ? truck.location.toLowerCase().includes(filteres.location.toLowerCase())
//       : true;

//     const matchesFeatures = Object.keys(filteres)
//       .filter(key => key !== "location")
//       .every(key => !filteres[key] || truck[key]);

//     return matchesLocation && matchesFeatures;
//   });

//   setFilteredTrucks(filtered);
// }, [filteres, allTrucks]);

// <div className={css.cartAllPage}>
//   {/* <SearchBoxFiltr trucksfilter={filteredTrucks} /> */}

//   {isLoading && <Loader />}
//   {/* <AllTruckList trucks={filteredTrucks} /> */}

// </div>;
// <SearchBoxFiltr filters={filteredTrucks} />

// useEffect(() => {
// // Оновити стан фільтрів на основі параметрів URL
// const location = params.get("owner");
// dispatch(setFilter({ filterName: "location", value: location }));

// // Фільтрація даних
// if (allTrucks.length > 0 && filteres) {
//   const filtered = allTrucks.filter(truck => {
//     const matchesLocation = filteres.location
//       ? truck.location.toLowerCase().includes(filteres.location.toLowerCase())
//       : true;

//     const matchesFeatures = Object.keys(filteres)
//       .filter(key => key !== "location")
//       .every(key => !filteres[key] || truck[key]);

//     return matchesLocation && matchesFeatures;
//   });
//     setFilteredTrucks(filtered);
// }, [filteres, allTrucks]);

// додав лог щоб перевірити, що передається в AllTruckList:
// console.log("Filtered Trucks:", filteredTrucks);
// додав лог щоб перевірити вхідні данні
// console.log("All Trucks:", allTrucks);
// console.log("Filters:", filteres);
