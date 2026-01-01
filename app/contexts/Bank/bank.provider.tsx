"use client";

import { useState } from "react";
import { BankContext } from "./bank.context";

const BankProvider = ({ children }: { children: React.ReactNode }) => {
    const [balance, setBalance] = useState(0);

    const agentBuyIn = (amount: number) => {
        setBalance(prevBalance => prevBalance + amount);
    }

    const seed = (amount: number) => {
        setBalance(prevBalance => prevBalance + amount);
    }

    const value = {
        balance,
        agentBuyIn,
        seed
    };

    return (
        <BankContext.Provider value={value}>
            {children}
        </BankContext.Provider>
    );
}

export default BankProvider;