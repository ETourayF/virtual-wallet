"use client";

import React, { useReducer } from "react";
import { Account, AccountContext, AccountTypes } from "./account.context";
import useLedger from "../Ledger/ledger.hook";

type AccountAction = 
  | { type: 'ISSUE_FUNDS'; toAccountId: string; amount: number }
  | { type: 'SEND_FUNDS'; fromAccountId: string; toAccountId: string; amount: number }
  | { type: 'ADD_ACCOUNT'; account: Account }
  | { type: 'WITHDRAW_FUNDS'; fromAccountId: string; agentId: string; amount: number }
  | { type: 'DEPOSIT_FUNDS'; toAccountId: string; agentId: string; amount: number };

const accountReducer = (state: Account[], action: AccountAction): Account[] => {
  switch (action.type) {
    case 'ISSUE_FUNDS':
      return state.map((acc) =>
        acc.id === action.toAccountId
          ? { ...acc, virtualBalance: (acc.virtualBalance ?? 0) + action.amount }
          : acc
      );
    case 'SEND_FUNDS':
      return state.map((acc) => {
        if (acc.id === action.fromAccountId) {
          return { ...acc, virtualBalance: (acc.virtualBalance ?? 0) - action.amount };
        } else if (acc.id === action.toAccountId) {
          return { ...acc, virtualBalance: (acc.virtualBalance ?? 0) + action.amount };
        }
        return acc;
      });
      case 'WITHDRAW_FUNDS':
        return state.map((acc) => {
          if (acc.id === action.fromAccountId) {
            return { ...acc, virtualBalance: (acc.virtualBalance ?? 0) - action.amount };
          }else if (acc.id === action.agentId) {
            return { ...acc, virtualBalance: (acc.virtualBalance ?? 0) + action.amount };
          }
          return acc;
        });
      case 'DEPOSIT_FUNDS':
        return state.map((acc) => {
          if (acc.id === action.toAccountId) {
            return { ...acc, virtualBalance: (acc.virtualBalance ?? 0) + action.amount };
          }else if (acc.id === action.agentId) {
            return { ...acc, virtualBalance: (acc.virtualBalance ?? 0) - action.amount };
          }
          return acc;
        });
      case 'ADD_ACCOUNT':
      return [...state, action.account];
    default:
      return state;
  }
};

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, dispatch] = useReducer(accountReducer, [
    {
      id: "1",
      name: "System Account",
      type: AccountTypes.SYSTEM,
      virtualBalance: 0,
    },
    { id: "2", name: "Agent 1", type: AccountTypes.AGENT, virtualBalance: 0 },
    { id: "4", name: "Agent 2", type: AccountTypes.AGENT, virtualBalance: 0 },
    { id: "3", name: "User 1", type: AccountTypes.USER, virtualBalance: 0 },
    { id: "5", name: "User 2", type: AccountTypes.USER, virtualBalance: 0 },
    { id: "6", name: "User 3", type: AccountTypes.USER, virtualBalance: 0 },
  ]);

  const { logTransaction } = useLedger();

  const addAccount = (account: Account) => {
    dispatch({ type: 'ADD_ACCOUNT', account });
  }

  const issueFunds = (toAccountId: string, amount: number) => {
    dispatch({ type: 'ISSUE_FUNDS', toAccountId, amount });
    logTransaction("ISS", toAccountId, amount);
  }

  const sendFunds = (fromAccountId: string, toAccountId: string, amount: number) => {
    dispatch({ type: 'SEND_FUNDS', fromAccountId, toAccountId, amount });
    logTransaction(fromAccountId, toAccountId, amount);
  }

  const withdrawFunds = (fromAccountId: string, agentId: string, amount: number) => {
    dispatch({ type: 'WITHDRAW_FUNDS', fromAccountId, agentId, amount });
    logTransaction(fromAccountId, agentId, amount);
  }

  const depositFunds = (toAccountId: string, agentId: string, amount: number) => {
    dispatch({ type: 'DEPOSIT_FUNDS', toAccountId, agentId, amount });
    logTransaction(agentId, toAccountId, amount);
  }

  const value = { accounts, addAccount, sendFunds, issueFunds, withdrawFunds, depositFunds };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export default AccountProvider;
