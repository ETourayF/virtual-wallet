import { use, useContext } from "react"
import { BankContext } from "./bank.context";

const useBank = () => {
    const context = useContext(BankContext);

    if (!context) {
        throw new Error("useBank must be used within a BankProvider");
    }
    return context
}

export default useBank;
