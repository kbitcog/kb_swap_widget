import { useState } from "react";
import { TokenSelectProps } from "../models/PropTypes";
import SelectTokenButton from "./SelectTokenButton";
import SelectTokenModal from "./SelectTokenModal";
import { nullToken } from "../data/frequentlySwappedTokens";
import { FaAngleDown } from "react-icons/fa";
import { SWAP_DIRECTION } from "../models/Enum";
const TokenSelect = ({
  className,
  token,
  onOpenTokenList,
}: TokenSelectProps) => {
  const tokenText = token.symbol ?? "Select a token";
  return (
    <button
      className={
        (className ? className + " " : "") +
        "flex flex-row items-center hover:bg-gray-900"
      }
      onClick={() => onOpenTokenList()}
    >
      {token.logoURI && (
        <img src={token.logoURI} alt={token.name} className="h-7 mr-2" />
      )}
      <p className="text-[14px] text-white ml-2 mr-2">{tokenText}</p>
      <FaAngleDown className="text-label h-[15px] w-auto" />
    </button>
  );
};

export default TokenSelect;
