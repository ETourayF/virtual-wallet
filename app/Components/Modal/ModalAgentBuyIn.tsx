import React, { useState } from 'react'
import styles from './Modal.module.css';
import useBank from '@/app/contexts/Bank/bank.hook';
import useAccount from '@/app/contexts/Account/account.hook';
import useModal from '@/app/contexts/Modal/modal.hook';
import useLedger from '@/app/contexts/Ledger/ledger.hook';
import { AccountTypes } from '@/app/contexts/Account/account.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { log } from 'console';
import TextInput from '../Input/TextInput';

type ModalAgentBuyInProps = {
    agentId?: string;
}

const ModalAgentBuyIn = (props: ModalAgentBuyInProps) => {
  const { agentId } = props;
  const { agentBuyIn } = useBank();
  const { issueFunds, accounts, sendFunds } = useAccount();
  const [amount, setAmount] = useState('');
  const {closeModal} = useModal();
  const { logTransaction } = useLedger();

  const systemAccount = accounts.find(acc => acc.type == AccountTypes.SYSTEM);

  if (!systemAccount) {
    return <div>Error: System account not found.</div>;
  }


  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const buyinAmount = parseFloat(amount);
      if (buyinAmount > 0) {
        agentBuyIn(buyinAmount);
        issueFunds(systemAccount.id, buyinAmount);
        sendFunds(systemAccount.id, agentId || '', buyinAmount);
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
        <button className={`${styles.submit}`} type="submit"><p>Cash In</p><FontAwesomeIcon icon={faCircleArrowRight} /> </button>
      </form>
    </div>
  )
}

export default ModalAgentBuyIn