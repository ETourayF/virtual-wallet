import { useContext } from "react";
import { LedgerContext } from "./ledger.context";

const useLedger = () => {
  const context = useContext(LedgerContext);

  if (!context) {
    throw new Error("useLedger must be used within a LedgerProvider");
  }
  return context;
};

export default useLedger;
