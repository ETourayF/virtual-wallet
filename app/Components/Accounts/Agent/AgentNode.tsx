import AccountNode, { AccountDomain } from "../AccountNode";
import { Account } from "@/app/contexts/Account/account.context";
import ControlButton from "../../ControlButton";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons/faCircleArrowDown";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons/faMoneyBillTransfer";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons/faCircleArrowUp";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import useModal from "@/app/contexts/Modal/modal.hook";
import { ModalTypes } from "@/app/contexts/Modal/modal.provider";

export type AgentNodeProps = {
  account?: Account;
};

const AgentNode = (props: AgentNodeProps) => {
  const { account } = props;
  const { openModal } = useModal();

  return (
    <div>
      <AccountNode
        name={account?.name}
        virtualBalance={account?.virtualBalance}
        domain={AccountDomain.VIRTUAL}
        Controls={[
          <ControlButton key="Cash" icon={faPiggyBank} label="Cash In" onClick={() => openModal(ModalTypes.AGENT_BUY_IN, "agent_section", { agentId: account?.id })}/>,
          <ControlButton key="send" icon={faMoneyBillTransfer} label="Send" onClick={()=>{openModal(ModalTypes.SEND_FUNDS, "agent_section", { fromAccountId: account?.id })}}/>,
          <ControlButton
            key="deposit"
            icon={faCircleArrowUp}
            label="Deposit"
            onClick={()=>{openModal(ModalTypes.DEPOSIT_FUNDS, "agent_section", { toAccountId: account?.id })}}
          />,
          <ControlButton
            key="withdraw"
            icon={faCircleArrowDown}
            label="Withdraw"
            onClick={()=>{openModal(ModalTypes.WITHDRAW_FUNDS, "agent_section", { fromAccountId: account?.id })}}
          />,
        ]}
      />
    </div>
  );
};

export default AgentNode;
