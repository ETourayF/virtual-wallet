"use client";

import { createContext } from "react";

export type Transaction = {
  id: string;
  debit: string;
  credit: string;
  amount: number;
}

export type LedgerContextType = {
    transactions: Transaction[];
    logTransaction: (debit: string, credit: string, amount: number) => void;
    getTransactionHistory: (accountId: string) => Transaction[];
};

export const LedgerContext = createContext<LedgerContextType | undefined>(undefined);