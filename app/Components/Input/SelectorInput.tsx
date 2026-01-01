import React, { useState } from 'react'
import styles from './Input.module.css'; // Adjust path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

type SelectorInputProps = {
  options: Array<{ value: string; label: string }>;
  onSelect?: (value: string) => void;
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SelectorInput = (props: SelectorInputProps) => {
  const {
    options,
    onSelect,
    error = false,
    ...inputProps
  } = props;

  const [selectedvalue, setSelectedvalue] = React.useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleItemSelect = (value: string, label: string) => {
    setSelectedvalue(label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(value);
    }
  }

  return (
    <div className={styles.modalSelectorInputWrapper}>
      <div className={`${styles.modalTextInputWrapper} ${error ? styles.inputError : ''}`} onClick={() => {setIsOpen(!isOpen)}}>
        <span className={styles.selectedvalue}>{selectedvalue || "Select an option"}</span>
        <span className={styles.dropdownArrow}><FontAwesomeIcon icon={faChevronCircleDown} /></span>
      </div>
      {isOpen && <div className={styles.dropdownContent}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.dropdownItem}
              {...inputProps}
              onClick={() => handleItemSelect(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>}
    </div>
  );
}

export default SelectorInput