import { use } from "react";
import { AccountContext } from "./account.context";

const useAccount = () => {
  const context = use(AccountContext);
  
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

export default useAccount;