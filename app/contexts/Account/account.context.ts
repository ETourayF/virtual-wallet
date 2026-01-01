"use client";

import { createContext } from "react";

export enum AccountTypes {
  SYSTEM = 0,
  AGENT = 1,
  USER = 2,
}

export type Account = {
  id: string;
  name: string;
  type?: AccountTypes;
  virtualBalance?: number;
}

export type AccountContextType = {
    accounts: Account[];
    addAccount: (account: Account) => void;
    sendFunds: (fromAccountId: string, toAccountId: string, amount: number) => void;
    withdrawFunds: (fromAccountId: string, agentId: string, amount: number) => void;
    depositFunds: (toAccountId: string, agentId: string, amount: number) => void;
    issueFunds: (toAccountId: string, amount: number) => void;
};

export const AccountContext = createContext<AccountContextType | undefined>(undefined);