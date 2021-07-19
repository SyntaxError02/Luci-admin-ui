import { useState } from 'react';
import FormButton from '../../components/FormButton/FormButton';
import { FormInputContainer } from '../../components/FormInputContainer/FormInputContainer';
import useForm from '../../utils/useForm';
import { validateLogin } from '../../utils/validationRules';
import axios from "../../utils/axios";
import setAuthToken from "../../utils/AuthTokenUtil";
import classes from './Login.module.scss';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onLogin = async () => {
    setMessage("");
    setIsLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post("login", payload)
      const { data } = response;
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      setMessage(data.message);
      setTimeout(() => {
        window.location.replace("/dashboard");
      }, 3000);
    } catch (error) {
      const {data: { message }} = error.response
      setMessage(message);
      setIsLoading(false);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    onLogin,
    validateLogin,
  );

  return (
    <div className={classes.Login}>
      <div className={classes.Login__container}>
        <h3 className={classes.Login__title}>luci admin</h3>
        <form className={classes.Login__form} onSubmit={handleSubmit}>
          <FormInputContainer
            name="email"
            inputName="email"
            inputType="email"
            inputValue={values.email}
            errorName={errors.email}
            placeholderText="email"
            change={handleChange}
            isRequired
          />
          <FormInputContainer
            name="password"
            inputName="password"
            inputType="password"
            inputValue={values.password}
            errorName={errors.password}
            placeholderText="password"
            change={handleChange}
            isRequired
          />

          {message && (
            <div className={classes.Login__message}>
              <p>{message}</p>
            </div>
          )}

          <FormButton
            name="login"
            isLoading={isLoading}
            buttonColor="#1D3557"
            textColor="#fff"
            loaderColor="#fff"
            loaderType="TailSpin"
          />
        </form>
      </div>
    </div>
  )
}

export default Login;
