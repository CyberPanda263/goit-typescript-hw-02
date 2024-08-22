import React from "react";
import { Field, Formik, Form, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const initialValues: FormValues = {
    query: "",
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!values.query.trim()) {
      toast.error("Please, enter a text to search for images.");
      return;
    }
    onSubmit(values.query);
    actions.resetForm();
  };

  return (
    <header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <button className={css.searchBtn} type="submit">
            <span>
              <FaSearch />
            </span>
          </button>
          <Field
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
