import React, { useState } from 'react'
import styles from './ControlButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

type ControlButtonProps = {
    icon: IconDefinition;
    label?: string;
    onClick?: () => void;
}

const ControlButton = ({ icon, onClick, label }: ControlButtonProps) => {
  const [isLabelVisible, setIsLabelVisible] = useState<boolean>(false);


  return (
    <div 
      className={styles.mainWrapper} 
      onMouseEnter={() => setIsLabelVisible(true)}
      onMouseLeave={() => setIsLabelVisible(false)}
      onClick={onClick}
    >
        <FontAwesomeIcon className={styles.icon} width="20px" icon={icon}/>
        {(label && isLabelVisible) && <p className={styles.label}>{label}</p>}
    </div>
  )
}

export default ControlButton