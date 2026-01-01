import React from 'react'
import styles from './Input.module.css'; // Adjust path as needed

type TextInputProps = {
  currencySymbol?: string;
  showCurrency?: boolean;
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = (props: TextInputProps) => {
  const {
    currencySymbol = "£",
    showCurrency = true,
    className,
    error = false,
    ...inputProps

  } = props;

  return (
    <div className={`${styles.modalTextInputWrapper} ${error ? styles.inputError : ""}`}>
      {showCurrency && (
        <span className={styles.currencySymbol}>{currencySymbol}</span>
      )}
      <input
        className={className}
        {...inputProps}
      />
    </div>
  )
}

export default TextInput