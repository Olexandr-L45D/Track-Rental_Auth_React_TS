import css from "./RegistrationForm.module.css";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { register } from "../../redux/auth/operations";
// register - запит на БЕКенд який повертає обєкт з даннними для регістрації (name: " ",email, password)
//  Ivan2@mail.com.ua,  Petrov@mail.com  autoComplete="off"
export default function RegistrationForm() {
  const dispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(register(values));
    actions.resetForm();
  };
  return (
    <div className={css.item}>
      <Formik
        initialValues={{
          name: " ",
          email: " ",
          password: " ",
        }}
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
}
