import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { register } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
// register - запит на БЕКенд який повертає обєкт з даннними для регістрації (name: " ",email, password)
// типізую для initialValues та values
  export interface UsRegisterVelues {
    name: string;
    email: string;
    password: string;
  }
  // Початкові значення форми
  const initialValues: UsRegisterVelues = {
    name: "",
    email: "",
    password: "",
};
  
export default function RegistrationForm() {
  const dispatch: AppDispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }

  const handleSubmit = (values: UsRegisterVelues, { setSubmitting, resetForm }: FormikHelpers<UsRegisterVelues>) => {
    console.log(values);
    dispatch(register(values));
    setSubmitting(false);
    resetForm();
  };
  return (
    <div className={css.item}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>Name</label>
            <Field
              className={css.inp}
              type="name"
              name="name"
              placeholder="Enter name..."
            />
          </div>
          <div className={css.items}>
            <label className={css.label}>Email</label>
            <Field
              className={css.inp}
              type="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>
          <div className={css.items}>
            <label className={css.label}>Password</label>
            <Field
              className={css.inp}
              type="password"
              name="password"
              placeholder="Please enter numbers and uppercase letters..."
            />
          </div>

          <div className={css.btn}>
            <button className={css.regForm} type="submit">
              {t("contacts.create")}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
