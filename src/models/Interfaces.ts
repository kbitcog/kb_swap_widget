import { TokenInfo } from "@usedapp/core/dist/esm/src/model/TokenInfo";
import { SWAP_DIRECTION } from "./Enum";

export interface ILink {
  name: string;
  url: string;
}

export interface IMenuLink extends ILink {
  isExternal: boolean;
}

export interface INetworkType {
  name: string;
  image: string;
  links: ILink[];
}

export interface IToken {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  eip2612?: boolean;
}

export interface ISwapTokenParams {
  token: IToken;
  direction: SWAP_DIRECTION;
}
