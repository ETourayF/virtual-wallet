"use client";

import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import ControlButton from "../../ControlButton";
import AccountNode, { AccountDomain } from "../AccountNode";
import useAccount from "@/app/contexts/Account/account.hook";
import useModal from "@/app/contexts/Modal/modal.hook";
import { ModalTypes } from "@/app/contexts/Modal/modal.provider";
import useBank from "@/app/contexts/Bank/bank.hook";

const Trustbank = () => {
  const account = {
    id: "1",
    name: "Trust Bank",
    physicalBalance: 10000,
  };

  const { accounts } = useAccount();
  const { openModal } = useModal();
  const { balance } = useBank();

  return (
    <div>
      <AccountNode
        name={account.name}
        physicalBalance={balance}
        domain={AccountDomain.PHYSICAL}
        Controls={[
          <ControlButton
            key={"seed funds"}
            label="Seed Funds"
            onClick={() => {
              openModal(ModalTypes.SEED_TRUST_BANK, "system_section");
            }}
            icon={faPiggyBank}
          />,
        ]}
      />
    </div>
  );
};

export default Trustbank;
