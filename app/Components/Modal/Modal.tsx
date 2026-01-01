import React, { useState } from 'react'
import styles from './Modal.module.css'
import useModal from '@/app/contexts/Modal/modal.hook'
import { ModalTypes } from '@/app/contexts/Modal/modal.provider'

type ModalProps = {
  contextArray?: ModalTypes[]
  modalId?: string
}

const Modal = (props: ModalProps) => {

  const {contextArray, modalId} = props;

  const { getModalContent, modalContext, isOpen, closeModal, modalIdentity } = useModal();
  
  if (!isOpen) {
    return null;
  }

  if ((contextArray && modalContext && !contextArray.includes(modalContext)) || (modalId && modalIdentity !== modalId)) {
    return null;
  }

  const modalContent = getModalContent();
  
  if (!modalContent) {
    return null;
  }

  const { content, title } = modalContent;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalHeader}>
        {title && <h5 className={styles.modalTitle}>{title}</h5>}
      </div>
      {content}
    </div>
  )
}

export default Modal