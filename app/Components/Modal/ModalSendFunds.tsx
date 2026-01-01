import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import useAccount from "@/app/contexts/Account/account.hook";
import TextInput from "../Input/TextInput";
import SelectorInput from "../Input/SelectorInput";
import { AccountTypes } from "@/app/contexts/Account/account.context";
import useModal from "@/app/contexts/Modal/modal.hook";

type modalSendFundsProps = {
  fromAccountId?: string;
};

const ModalSendFunds = (props: modalSendFundsProps) => {
  const { fromAccountId } = props;
  const { accounts, sendFunds } = useAccount();
  const { closeModal } = useModal();

  const [amount, setAmount] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount === "" || toAccountId === "") return;
    if (!fromAccountId) return;
    const userAccountBalance = accounts.find(
      (acc) => acc.id === fromAccountId!
    )!.virtualBalance;

    if (
      userAccountBalance !== undefined &&
      (parseFloat(amount) > userAccountBalance || userAccountBalance <= 0)
    ) {
      alert("Insufficient funds.");
      setShowError(true);
      return;
    }

    sendFunds(fromAccountId!, toAccountId, parseFloat(amount));
    closeModal();
  };

  const handleSelect = (value: string | React.SyntheticEvent<HTMLInputElement, Event>) => {
    if (typeof value === 'string') {
      setToAccountId(value);
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div>
      <form className={styles.modalForm} onSubmit={handleSubmit}>
        <TextInput
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          error={showError}
        />
        <SelectorInput
          options={accounts
            .filter(account => account.id !== fromAccountId && account.type !== AccountTypes.SYSTEM)
            .map(account => ({ 
              value: account.id, 
              label: account.name
            }))}
          onSelect={(value) => handleSelect(value)}
          required
        />
        <button className={`${styles.submit}`} type="submit">
          <p>Send</p>
          <FontAwesomeIcon icon={faCircleArrowRight} />{" "}
        </button>
      </form>
    </div>
  );
};

export default ModalSendFunds;
