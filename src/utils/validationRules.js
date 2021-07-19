export function validateLogin(values) {
  const errors = {};
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password || values.password.trim() === "") {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
}

export function validateUser(values) {
  const errors = {};

  if (!values.name && values.name.trim() === "") {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name must be more than 2 characters long";
  }

  return errors;
}
