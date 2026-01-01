import useAccount from '@/app/contexts/Account/account.hook';
import useModal from '@/app/contexts/Modal/modal.hook';
import React, { useEffect, useState } from 'react'
import styles from './Modal.module.css'
import TextInput from '../Input/TextInput';
import { AccountTypes } from '@/app/contexts/Account/account.context';
import SelectorInput from '../Input/SelectorInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

type modalDepositFundsProps = {
    toAccountId?: string;
};

const ModalDepositFunds = (props: modalDepositFundsProps) => {
    const [agentId, setAgentId] = useState("");
    const [amount, setAmount] = useState("");
    const [showError, setShowError] = useState(false);
    const { toAccountId } = props;
    const { depositFunds, accounts } = useAccount();
    const {closeModal} = useModal();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (amount === "" || agentId === "") return;
      if (!toAccountId) return;
      if (!agentId) return;
      const agentAccountBalance = accounts.find(
        (acc) => acc.id === agentId
      )!.virtualBalance;
      if (agentAccountBalance !== undefined && (parseFloat(amount) > agentAccountBalance || agentAccountBalance <= 0)) {
        alert("Agent has insufficient funds.");
        setShowError(true);
        return;
      }
      depositFunds(toAccountId!, agentId, parseFloat(amount));
      closeModal();
    };

    const handleSelect = (
      value: string | React.SyntheticEvent<HTMLInputElement, Event>
    ) => {
      if (typeof value === "string") {
        setAgentId(value);
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
    <div><form className={styles.modalForm} onSubmit={handleSubmit}>
        <TextInput
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <SelectorInput
          options={accounts
            .filter(account => account.id !== toAccountId && account.type == AccountTypes.AGENT)
            .map(account => ({ 
              value: account.id, 
              label: account.name
            }))}
          onSelect={(value) => handleSelect(value)}
          required
          error={showError}
        />
        <button className={`${styles.submit}`} type="submit">
          <p>Deposit</p>
          <FontAwesomeIcon icon={faCircleArrowRight} />{" "}
        </button>
      </form></div>
  )
}

export default ModalDepositFunds