
import css from "./SearchBoxFiltr.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filters/slice";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { selectFilters } from "../../redux/filters/selectors";
import { useTranslation } from "react-i18next";

export default function SearchBoxFiltr(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [params, setParams] = useSearchParams();

  // типізую локацію для initialValues та values
  interface SearchBoxVelues {
    location: string; 
  }
  // Початкові значення форми
  const initialValues: SearchBoxVelues = {
    location: filters.location || "",
  };

  // Схема валідації форми
  const validationSchema = Yup.object({
    location: Yup.string()
      .required("Location is required")
      .min(3, "Location must be at least 3 characters"),
  });
  
  const handleSubmit = (values: SearchBoxVelues, { setSubmitting }: FormikHelpers<SearchBoxVelues>) => {
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


