import React from "react";
import AccountNode, { AccountDomain } from "../AccountNode";
import { Account } from "@/app/contexts/Account/account.context";
import styles from "./UserNode.module.css";
import ControlButton from "../../ControlButton";
import {
  faCircleArrowDown,
  faCircleArrowUp,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import useModal from "@/app/contexts/Modal/modal.hook";
import { ModalTypes } from "@/app/contexts/Modal/modal.provider";

type UserNodeProps = {
  account: Account;
};

const UserNode = ({ account }: UserNodeProps) => {

  const { openModal } = useModal();

  return (
    <div className={styles.mainWrapper}>
      <AccountNode
        name={account.name}
        virtualBalance={account?.virtualBalance}
        domain={AccountDomain.VIRTUAL}
        Controls={[
          <ControlButton
            key="send"
            icon={faMoneyBillTransfer}
            label="Send"
            onClick={() => {
              openModal(ModalTypes.SEND_FUNDS, "user_section", {
                fromAccountId: account?.id,
              });
            }}
          />,
          <ControlButton
            key="deposit"
            icon={faCircleArrowUp}
            label="Deposit"
            onClick={() => {
              openModal(ModalTypes.DEPOSIT_FUNDS, "user_section", {
                toAccountId: account?.id,
              });
            }}
          />,
          <ControlButton
            key="withdraw"
            icon={faCircleArrowDown}
            label="Withdraw"
            onClick={() => {
              openModal(ModalTypes.WITHDRAW_FUNDS, "user_section", {
                fromAccountId: account?.id,
              });
            }}
          />,
        ]}
      />
    </div>
  );
};

export default UserNode;
