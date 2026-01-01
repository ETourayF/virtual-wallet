import React, { useState } from "react";
import styles from './Modal.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import useAccount from "@/app/contexts/Account/account.hook";
import useBank from "@/app/contexts/Bank/bank.hook";
import useModal from "@/app/contexts/Modal/modal.hook";
import useLedger from "@/app/contexts/Ledger/ledger.hook";
import { AccountTypes } from "@/app/contexts/Account/account.context";
import TextInput from '../Input/TextInput';

const ModalSeedTrustBank = () => {
  const { seed } = useBank();
  const { issueFunds, accounts } = useAccount();
  const [amount, setAmount] = useState('');
  const {closeModal} = useModal();
  const { logTransaction } = useLedger();

  const systemAccount = accounts.find(acc => acc.type == AccountTypes.SYSTEM);

  if (!systemAccount) {
    return <div>Error: System account not found.</div>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const seedAmount = parseFloat(amount);
    if (seedAmount > 0) {
      seed(seedAmount);
      issueFunds(systemAccount.id, seedAmount);
      setAmount('');
    }
    closeModal();
  };

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
        />
        <button className={`${styles.submit}`} type="submit"><p>Seed</p><FontAwesomeIcon icon={faCircleArrowRight} /> </button>
      </form>
    </div>
 );
};

export default ModalSeedTrustBank;
