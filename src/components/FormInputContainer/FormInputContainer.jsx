import React from "react";
import Select from 'react-select';
import styles from "./FormInputContainer.module.scss";

export const FormInputContainer = ({
  name,
  inputName,
  inputType,
  inputValue,
  errorName,
  placeholderText,
  change,
  isRequired,
  pattern,
  selectOptions,
  customInputStyle,
  maxDate,
  minDate,
  isMulti,
  isClearable
}) => {
  const renderInput = (type) => {
    switch (type) {
      case 'date':
        return (
          <input
            className={`${styles.FormInput} ${errorName && `${styles.isError}`}`}
            type={inputType}
            name={name}
            id={name}
            value={inputValue || ""}
            onChange={change}
            placeholder={placeholderText}
            required={isRequired}
            style={customInputStyle}
            max={maxDate}
            min={minDate}
          />
        )
      case 'email':
      case 'text':
      case 'password':
        return (
          <input
            className={`${styles.FormInput} ${errorName && `${styles.isError}`}`}
            type={inputType}
            name={name}
            id={name}
            value={inputValue || ""}
            onChange={change}
            placeholder={placeholderText}
            required={isRequired}
            style={customInputStyle}
          />
        )
      case 'tel':
        return (
          <input
            className={`${styles.FormInput} ${errorName && `${styles.isError}`}`}
            type={inputType}
            name={name}
            id={name}
            pattern={pattern}
            value={inputValue || ""}
            onChange={change}
            placeholder={placeholderText}
            required={isRequired}
            style={customInputStyle}
          />
        )
      case 'select':
        return (
          <Select
            placeholder="Select Option"
            options={selectOptions}
            value={inputValue || ""}
            onChange={change}
            name={name}
            style={customInputStyle}
            isMulti={isMulti}
            isClearable={isClearable}
          />
        );
      case 'number':
      return (
        <input
          className={`${styles.FormInput} ${errorName && `${styles.isError}`}`}
          type={inputType}
          name={name}
          id={name}
          value={inputValue || ""}
          onChange={change}
          placeholder={placeholderText}
          required={isRequired}
          style={customInputStyle}
          min={0}
        />
      )
      default:
        return (
          <textarea
            className={`${styles.FormInput} ${styles.FormTextInput} ${
              errorName && `${styles.isError}`
            }`}
            name={name}
            id={name}
            value={inputValue || ""}
            onChange={change}
            placeholder={placeholderText}
            required={isRequired}
            style={customInputStyle}
          />
        )
    }
  }

  return (
    <div className={styles.FormContainer}>
      <label htmlFor={name} className={styles.FormLabel}>
        {inputName}
      </label>
      {renderInput(inputType)}
      {errorName && <p className={styles.help}>{errorName}</p>}
    </div>
  );
};
