import useAccount from '@/app/contexts/Account/account.hook';
import useModal from '@/app/contexts/Modal/modal.hook';
import React, { useEffect, useState } from 'react'
import styles from './Modal.module.css'
import TextInput from '../Input/TextInput';
import { AccountTypes } from '@/app/contexts/Account/account.context';
import SelectorInput from '../Input/SelectorInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

type modalWithdrawFundsProps = {
    fromAccountId?: string;
};

const ModalWithdrawFunds = (props: modalWithdrawFundsProps) => {
    const [agentId, setAgentId] = useState("");
    const [amount, setAmount] = useState("");
    const { fromAccountId } = props;
    const { withdrawFunds, accounts } = useAccount();
    const {closeModal} = useModal();
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (amount === "" || agentId === "") return;
      if (!fromAccountId) return;
      const userAccountBalance = accounts.find(
        (acc) => acc.id === fromAccountId!
      )!.virtualBalance;
      if (userAccountBalance !== undefined && (parseFloat(amount) > userAccountBalance || userAccountBalance <= 0)) {
        setShowError(true);
        return;
      }
      withdrawFunds(fromAccountId!, agentId, parseFloat(amount));
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
          error={showError}
        />
        <SelectorInput
          options={accounts
            .filter(account => account.id !== fromAccountId && account.type == AccountTypes.AGENT)
            .map(account => ({ 
              value: account.id, 
              label: account.name
            }))}
          onSelect={(value) => handleSelect(value)}
          required
        />
        <button className={`${styles.submit}`} type="submit">
          <p>Withdraw</p>
          <FontAwesomeIcon icon={faCircleArrowRight} />{" "}
        </button>
      </form></div>
  )
}

export default ModalWithdrawFunds