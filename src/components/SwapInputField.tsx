import { useEthers, useTokenBalance } from "@usedapp/core";
import { useEffect, useState } from "react";
import { useTokenPrice } from "../hooks/use-token-price";
import { SWAP_DIRECTION } from "../models/Enum";
import { SwapInputFieldProps } from "../models/PropTypes";
import TokenSelect from "./TokenSelect";
const SwapInputField = ({
  className,
  token,
  setSwapParams,
  direction,
  onUpdateTokenPrice,
  onOpenTokenList,
}: SwapInputFieldProps) => {
  const { account } = useEthers();
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  const balance = useTokenBalance(token.address, account ?? undefined);
  const { price, loading } = useTokenPrice(token);

  useEffect(() => {
    // console.log("address:", token.address, ":price:", price, ':balance:', balance);
    onUpdateTokenPrice(price ?? 0, loading, direction);
  }, [token, price, balance, loading]);

  function handleActivation(e: any) {
    setActive(!!e.target.value);
  }

  const tokenText = token.symbol ?? "Select a token";
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-1 mx-2">
        <p className="text-label text-sm">
          {direction === SWAP_DIRECTION.FROM ? "From:" : "To:"}
        </p>
        {/* <p className="text-label text-sm">Balance: {balance ? price * balance.toNumber() : '0'}</p> */}
        {loading ? (
          <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-main"></div>
          </div>
        ) : (
          <p className="text-label text-sm">Balance: {price}</p>
        )}
      </div>
      <div
        className={
          (className ? className + " " : "") +
          "p-[10px] bg-black rounded-md border border-solid border-[#CCCED9]/[0.15] hover:border-gray-400 flex justify-between"
        }
      >
        <div className="inline-block">
          <div className="text-inputlabel text-[14px]">{tokenText}</div>
          <input
            type="text"
            name={tokenText}
            className="bg-transparent text-md text-white focus-visible:outline-none"
            onChange={handleActivation}
            placeholder="0.0"
          />
        </div>
        <TokenSelect
          token={token}
          onOpenTokenList={() => onOpenTokenList(direction)}
        />
      </div>
    </div>
  );
};

export default SwapInputField;
