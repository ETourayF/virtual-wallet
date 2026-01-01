"use client";

import { useMemo } from "react";
import AccountNode, { AccountDomain } from "./Components/Accounts/AccountNode";
import AgentNode from "./Components/Accounts/Agent/AgentNode";
import Trustbank from "./Components/Accounts/Bank/Trustbank";
import UserNode from "./Components/Accounts/User/UserNode";
import Ledger from "./Components/Ledger";
import { AccountTypes } from "./contexts/Account/account.context";
import useAccount from "./contexts/Account/account.hook";
import styles from "./page.module.css";
import Modal from "./Components/Modal/Modal";

export default function Home() {
  const { accounts } = useAccount();

  const { agentNodes, userNodes, systemNodes } = useMemo(() => {
    const agents: React.ReactNode[] = [];
    const users: React.ReactNode[] = [];
    const systems: React.ReactNode[] = [];

    accounts.forEach((acc) => {
      if (acc.type === AccountTypes.AGENT) {
        agents.push(<AgentNode key={acc.id} account={acc} />);
      } else if (acc.type === AccountTypes.USER) {
        users.push(<UserNode key={acc.id} account={acc} />);
      } else if (acc.type === AccountTypes.SYSTEM) {
        systems.push(
          <AccountNode
            key={acc.id}
            name={acc.name}
            virtualBalance={acc.virtualBalance}
            domain={AccountDomain.VIRTUAL}
          />
        );
      }
    });

    return { agentNodes: agents, userNodes: users, systemNodes: systems };
  }, [accounts]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.menu}></div>
        <div className={styles.content}>
          <div className={styles.contentSection}>
            <h3>Transactions</h3>
            <Ledger />
          </div>
          <div className={styles.contentSection}>
            <h3>Manta</h3>
            <Trustbank />
            {systemNodes}
            <Modal modalId={"system_section"}/>
          </div>
          <div className={styles.contentSection}>
            <h3>Agents</h3>
            {agentNodes}
            <Modal modalId={"agent_section"}/>
          </div>
          <div className={styles.contentSection}>
            <h3>Users</h3>
            {userNodes}
            <Modal modalId={"user_section"}/>
          </div>
        </div>
      </main>
    </div>
  );
}
