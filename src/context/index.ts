import { createContext } from "react";
import { WalletConnectState } from "../hooks/use-wallet-connect";

export const WalletConnectContext = createContext<WalletConnectState>({
  loading: false,
  active: false,
  account: null,
  ensAddress: null,
  library: undefined,
  error: null,
  activateProvider: () => {},
  deactivate: () => {},
  activateBrowserWallet: () => {},
})