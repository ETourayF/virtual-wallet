"use client";

import React, { useReducer } from "react";
import { LedgerContext, Transaction } from "./ledger.context";

type LedgerAction = {
  type: 'LOG_TRANSACTION';
  debit: string;
  credit: string;
  amount: number;
};

const ledgerReducer = (state: Transaction[], action: LedgerAction): Transaction[] => {
  switch (action.type) {
    case 'LOG_TRANSACTION':
      const newTransaction: Transaction = {
        id: (state.length + 1).toString(),
        debit: action.debit,
        credit: action.credit,
        amount: action.amount,
      };
      return [...state, newTransaction];
    default:
      return state;
  }
};

const LedgerProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, dispatch] = useReducer(ledgerReducer, []);

  const logTransaction = (debit: string, credit: string, amount: number) => {
    dispatch({ type: 'LOG_TRANSACTION', debit, credit, amount });
  };

  const getTransactionHistory = (accountId: string): Transaction[] => {
    return transactions.filter(
      (transaction) =>
        transaction.debit === accountId || transaction.credit === accountId
    );
  };

  const value = { transactions, logTransaction, getTransactionHistory };

  return (
    <LedgerContext.Provider value={value}>{children}</LedgerContext.Provider>
  );
};

export default LedgerProvider;
