"use client";

import React, { useState } from 'react'
import { ModalContext } from './modal.context';
import ModalSeedTrustBank from '@/app/Components/Modal/ModalSeedTrustBank';
import ModalAgentBuyIn from '@/app/Components/Modal/ModalAgentBuyIn';
import ModalSendFunds from '@/app/Components/Modal/ModalSendFunds';
import ModalWithdrawFunds from '@/app/Components/Modal/ModalWithdrawFunds';
import ModalDepositFunds from '@/app/Components/Modal/ModalDepositFunds';

export enum ModalTypes {
    SEED_TRUST_BANK = "SEED_TRUST_BANK",
    AGENT_BUY_IN = "AGENT_BUY_IN",
    SEND_FUNDS = "SEND_FUNDS",
    WITHDRAW_FUNDS = "WITHDRAW_FUNDS",
    DEPOSIT_FUNDS = "DEPOSIT_FUNDS",
}

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContext, setModalContext] = useState<ModalTypes | undefined>(undefined);
  const [modalIdentity, setModalIdentity] = useState<string | undefined>(undefined);
  const [modalParams, setModalParams] = useState<Record<string, unknown> | undefined>(undefined);

  const getModalContent = () => {
    switch (modalContext) {
      case ModalTypes.SEED_TRUST_BANK:
        return {
          content: <ModalSeedTrustBank {...modalParams} />,
          title: "Seed Trust Bank",
        };
      case ModalTypes.AGENT_BUY_IN:
        return {
          content: <ModalAgentBuyIn {...modalParams} />,
          title: "Agent Buy In",
        };
      case ModalTypes.SEND_FUNDS:
        return {
          content: <ModalSendFunds {...modalParams} />,
          title: "Send Funds",
        };
      case ModalTypes.WITHDRAW_FUNDS:
        return {
          content: <ModalWithdrawFunds {...modalParams} />,
          title: "Withdraw Funds",
        };
      case ModalTypes.DEPOSIT_FUNDS:
        return {
          content: <ModalDepositFunds {...modalParams} />,
          title: "Deposit Funds",
        };
      default:
        return null;
    }
  };

  const openModal = (context: ModalTypes, modalIdentity?: string, params?: Record<string, unknown>) => {
    setModalContext(context);
    setModalIdentity(modalIdentity);
    setModalParams(params);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalContext(undefined);
    setModalIdentity(undefined);
    setModalParams(undefined);
    setIsOpen(false);
  };

  const value = { isOpen, modalContext, modalIdentity, openModal, closeModal, getModalContent };
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export default ModalProvider