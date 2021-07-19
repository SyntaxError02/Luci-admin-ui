/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useForm = (callback, validate, data = {}) => {
  const [values, setValues] = useState(data);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
