import tokens, {nullToken} from "../data/frequentlySwappedTokens";
import { atom } from "recoil";

export const currentSwapAtom = atom({
    key: "currentSwapAtom",
    default: {
      from: tokens[0],
      to: tokens[1],
      amount: 0,
      gasPrice: 0,
      gasLimit: 0,
      total: 0,
      status: "",
    },
  });

  export const userAccountAtom = atom({
    key: "userAccountAtom",
    default: {
      connected: false,
      address: "",
      balance: 10
    },
  });

  export const tokensListAtom = atom({
    key: "tokensListAtom",
    default: [],
  });