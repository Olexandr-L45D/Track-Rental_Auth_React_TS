// import css from "./SearchBoxFiltr.module.css";
import css from "./SearchBoxFiltr.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filters/slice";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { selectFilters } from "../../redux/filters/selectors";
import { useTranslation } from "react-i18next";

export default function SearchBoxFiltr() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [params, setParams] = useSearchParams();

  // Початкові значення форми
  const initialValues = {
    location: filters.location || "",
  };

  // Схема валідації форми
  const validationSchema = Yup.object({
    location: Yup.string()
      .required("Location is required")
      .min(3, "Location must be at least 3 characters"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const locationValue = values.location.trim();

    // Оновлення URL параметрів
    const newParams = new URLSearchParams(params.toString());
    newParams.set("location", locationValue);
    setParams(newParams);

    // Диспатч фільтра в Redux
    dispatch(setFilter({ filterName: "location", value: locationValue }));
    setSubmitting(false);
  };

  return (
    <div className={css.item}>
      <h2 className={css.paragraf}>{t("navigation.searchTitle")}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <label className={css.label}>
              {t("navigation.example")}
              <Field
                type="text"
                name="location"
                placeholder="Enter the location..."
                className={css.inp}
              />
              <ErrorMessage
                name="location"
                component="p"
                className={css.error}
              />
            </label>
            <div className={css.buttonIconSearch}>
              <button
                className={css.btnSearch}
                type="submit"
                disabled={isSubmitting}
              >
                {t("navigation.search")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// import { useDispatch, useSelector } from "react-redux";
// // import sprite from "../../images/sprite.svg";
// import { setFilter } from "../../redux/filters/slice";
// import { useSearchParams } from "react-router-dom";
// import { useState } from "react";
// // import { useCallback } from "react";
// import { selectFilters } from "../../redux/filters/selectors";

// export default function SearchBoxFiltr() {
//   const dispatch = useDispatch();
//   const filters = useSelector(selectFilters); // Мемоізований селектор
//   const [params, setParams] = useSearchParams();
//   const [error, setError] = useState("");
//   // const stableSetParams = useCallback(setParams, [setParams]);  мемоізація - пробна
//   console.log("Filters:", filters);

//   const handleSubmit = event => {
//     event.preventDefault();
//     const locationValue = event.target.elements.owner.value.trim();
//     // const locationValue = event.target.elements.value.trim();

//     if (!locationValue) {
//       setError("Please enter a location.");
//       return;
//     }

//     setError("");
//     const newParams = new URLSearchParams(params.toString());
//     newParams.set("owner", locationValue);
//     setParams(newParams);
//     console.log("Submitted location:", locationValue); // Додайте це
//     dispatch(setFilter({ filterName: "location", value: locationValue }));
//   };
//   //для тесту має працювати location: "Ukraine, Kyiv" так як воно є в базі на групі вантажівок

//   console.log("Test Filters in SearchBoxFiltr component:", filters);

//   if (!filters || typeof filters.filters !== "object") {
//     return <p>Loading filters...</p>;
//   }

//   return (
//     <div className={css.item}>
//       <h5 className={css.paragraf}>Find truck by location</h5>
//       <form onSubmit={handleSubmit}>
//         {/* Поле локації */}
//         <label className={css.label}>
//           Location:
//           {/* <input type="text" name="owner" placeholder="Enter location" /> */}
//           <input
//             type="text"
//             name="owner"
//             placeholder="Enter location"
//             value={filters.location || ""}
//             onChange={e =>
//               dispatch(
//                 setFilter({ filterName: "location", value: e.target.value })
//               )
//             }
//           />
//         </label>

//         <div className={css.buttonIconSearch}>
//           {error && <p className={css.error}>{error}</p>}
//           <button className={css.btnSearch} type="submit">
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default function SearchBoxFiltr() {
//   const dispatch = useDispatch();
//   const filter = useSelector(selectFilters); // Мемоізований селектор
//   const [params, setParams] = useSearchParams();
//   const [error, setError] = useState("");
//   // const stableSetParams = useCallback(setParams, [setParams]);  мемоізація - пробна

//   const handleSubmit = event => {
//     event.preventDefault();
//     const locationValue = event.target.elements.owner.value.trim();

//     if (!locationValue) {
//       setError("Please enter a location.");
//       return;
//     }

//     setError("");
//     const newParams = new URLSearchParams(params.toString());
//     newParams.set("owner", locationValue);
//     setParams(newParams);

//     dispatch(setFilter({ filterName: "location", value: locationValue }));
//   };
//   // Обробка вибору чекбоксів // location: "Ukraine, Kyiv"
//   const handleOptionClick = useCallback(
//     optionName => {
//       console.log(`Dispatching filter for: ${optionName}`);
//       dispatch(
//         setFilter({
//           filterName: optionName,
//           value: !filter.filters[optionName],
//         })
//       );
//       // dispatch(
//       //   setFilter({
//       //     filterName: optionName,
//       //     value: !Boolean(filter.filters?.[optionName] || false),
//       //   })
//       // );
//     },
//     [dispatch, filter.filters]
//   );

//   // if (!filter || !filter.filters) {
//   //   return <p>Loading filters...</p>;
//   // }
//   if (!filter || typeof filter.filters !== "object") {
//     return <p>Loading filters...</p>;
//   }

//   return (
//     <div className={css.item}>
//       <h5 className={css.paragraf}>Find truck by location</h5>
//       <form onSubmit={handleSubmit}>
//         {/* Поле локації */}
//         <label className={css.label}>
//           Location:
//           <input type="text" name="owner" placeholder="Enter location" />
//         </label>

//         {/* Секція чекбоксів */}
//         <h4>Vehicle equipment</h4>

//         <div className={css.itemsCont}>
//           {[
//             { name: "kitchen", icon: "icon-kitch", label: "Kitchen" },
//             { name: "AC", icon: "icon-ac", label: "AC" },
//             { name: "bathroom", icon: "icon-bathroom", label: "Bathroom" },
//             { name: "van", icon: "icon-van", label: "Van" },
//             { name: "TV", icon: "icon-tv", label: "TV" },
//           ].map(option => (
//             <div key={option.name} className={css.items}>
//               <p
//                 className={`${css.iconCard} ${
//                   filter.filters[option.name] ? css.active : ""
//                 }`}
//                 onClick={() => handleOptionClick(option.name)}
//               >
//                 <svg className={css.icon}>
//                   <use href={`${sprite}#${option.icon}`} />
//                 </svg>
//                 {option.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className={css.buttonIconSearch}>
//           {error && <p className={css.error}>{error}</p>}
//           <button className={css.btnSearch} type="submit">
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// const handleReset = () => {
//   dispatch(resetFilters());
// };

// const handleOptionClick = useCallback(
//   optionName => {
//     console.log(`Dispatching filter for: ${optionName}`);
//     dispatch(
//       setFilter({
//         filterName: optionName,
//         value: !filter.filters[optionName],
//       })
//     );
//   },
//   [dispatch, filter.filters]
// );

// useEffect(() => {
//   // ... ваш поточний код

//   // Оновити стан фільтрів на основі параметрів URL
//   const location = params.get("owner");
//   dispatch(setFilter({ filterName: "location", value: location }));
// }, [dispatch, params]);

// useEffect(() => {
//   // ... ваш поточний код фільтрації

//   // Оновити параметри URL при зміні фільтрів
//   if (filteres.location) {
//     setParams({ owner: filteres.location });
//   }
// }, [filteres, setParams]);

// export default function SearchBoxFiltr() {
//   const dispatch = useDispatch();
//   // const filter = useSelector(selectStatusFilter);
//   const filter = useSelector(selectFilteredItems);
//   const [params, setParams] = useSearchParams();
//   const [error, setError] = useState("");
//   // Обробка сабміту форми
//   const handleSubmit = event => {
//     event.preventDefault();
//     const locationValue = event.target.elements.owner.value.trim();

//     if (!locationValue) {
//       setError("Please enter a location.");
//       return;
//     }

//     setError("");
//     params.set("owner", locationValue);
//     setParams(params);

//     // Додавання значення в Redux
//     dispatch(setFilter({ filterName: "location", value: locationValue }));

//     console.log("Setting filter:", {
//       filterName: "location",
//       value: locationValue,
//     });
//   };
//   // Обробка вибору чекбоксів // location: "Ukraine, Kyiv"
//   // const handleOptionClick = useCallback(() => {
//   //   console.log("Dispatching filter: Ukraine, Kyiv");
//   //   dispatch(setFilter({ filterName: "location", value: "Ukraine, Kyiv" }));
//   // }, [dispatch]);

//   const handleOptionClick = useCallback(
//     optionName => {
//       console.log(`Dispatching filter for: ${optionName}`);
//       dispatch(
//         setFilter({
//           filterName: optionName,
//           value: !filter.filters[optionName],
//         })
//       );
//     },
//     [dispatch, filter.filters]
//   );

//   // const handleReset = () => {
//   //   dispatch(resetFilters());
//   // };
//   if (!filter || !filter.filters) {
//     return <p>Loading filters...</p>;
//   }

//   return (
//     <div className={css.item}>
//       <h5 className={css.paragraf}>Find truck by location</h5>
//       <form onSubmit={handleSubmit}>
//         {/* Поле локації */}
//         <label className={css.label}>
//           Location:
//           <input type="text" name="owner" placeholder="Enter location" />
//         </label>

//         {/* Секція чекбоксів */}
//         <h4>Vehicle equipment</h4>
//         <div className={css.itemsCont}>
//           {[
//             { name: "kitchen", icon: "icon-kitch", label: "Kitchen" },
//             { name: "AC", icon: "icon-ac", label: "AC" },
//             { name: "bathroom", icon: "icon-bathroom", label: "Bathroom" },
//             { name: "van", icon: "icon-van", label: "Van" },
//             { name: "TV", icon: "icon-tv", label: "TV" },
//           ].map(option => (
//             <div key={option.name} className={css.items}>
//               <p
//                 className={`${css.iconCard} ${
//                   filter.filters[option.name] ? css.active : ""
//                 }`}
//                 onClick={() => handleOptionClick(option.name)}
//               >
//                 <svg className={css.icon}>
//                   <use href={`${sprite}#${option.icon}`} />
//                 </svg>
//                 {option.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className={css.buttonIconSearch}>
//           {error && <p className={css.error}>{error}</p>}
//           <button className={css.btnSearch} type="submit">
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// const setFilter = (key, value) => ({
//   type: "SET_FILTER",
//   payload: { key, value },
// });
/* Кнопки для скидання та сабміту */

/* <button className={css.btnReset} type="button" onClick={handleReset}>
          Reset Filters
        </button> */
