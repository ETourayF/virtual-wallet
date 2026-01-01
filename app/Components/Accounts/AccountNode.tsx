"use client";

import styles from "./AccountNode.module.css";

type AccountNodeProps = {
  name?: string;
  virtualBalance?: number;
  physicalBalance?: number;
  domain?: AccountDomain
  Controls?: React.ReactNode[];
};

export enum AccountDomain {
    PHYSICAL = 0,
    VIRTUAL = 1,
}

const AccountNode = (props: AccountNodeProps) => {
  const {
    name = "Unnamed Account",
    virtualBalance = 0,
    physicalBalance,
    domain = AccountDomain.PHYSICAL,
    Controls = [],
  } = props;

  return (
    <div className={styles.mainWrapper}>
      <div className={`${styles.panel} ${styles.nodeWrapper}`}>
        <h4 className={styles.title}>{name}</h4>
        {domain == AccountDomain.VIRTUAL && (
          <div className={styles.balance}>
            <p className={`${styles.amount} ${styles.virtual}`}>
              {virtualBalance}
            </p>
          </div>
        )}
        {physicalBalance !== undefined && (
          <div className={styles.balance}>
            <p className={`${styles.amount} ${styles.physical}`}>
              {physicalBalance}
            </p>
          </div>
        )}
      </div>
      <div className={styles.controls}>
        {Controls.map((Control, index) => (
          <div key={index} className={styles.controlButton}>
            {Control}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountNode;
