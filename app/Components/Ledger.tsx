import React from 'react'
import styles from "./Ledger.module.css";
import { Transaction } from '../contexts/Ledger/ledger.context';
import useLedger from '../contexts/Ledger/ledger.hook';



const Ledger = () => {

  const { transactions } = useLedger();

  return (
    <div className={styles.mainWrapper}>
        <h4 className={styles.title}>Ledger</h4>
        <div className={styles.ledgerWrapper}>
            <div className={styles.ledgerHeader}>
                <span className={styles.headerItem}>Debit</span>
                <span className={styles.headerItem}>Credit</span>
                <span className={styles.headerItem}>Amount</span>
            </div>
            <div className={styles.ledgerContent}>
                {transactions.map((transaction) => (
                    <div key={transaction.id} className={styles.ledgerRow}>
                        <span className={styles.rowItem}>{transaction.debit}</span>
                        <span className={styles.rowItem}>{transaction.credit}</span>
                        <span className={styles.rowItem}>{transaction.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Ledger