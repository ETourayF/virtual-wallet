"use client";

import { createContext } from "react";

export type bankContextType = {
    balance: number;
    agentBuyIn: (amount: number) => void;
    seed(amount: number): void;
};

export const BankContext = createContext<bankContextType | undefined>(undefined);