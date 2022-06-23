import { useEffect } from 'react';
import { TokenListItemProps } from "../models/PropTypes";
import { useEthers, useTokenBalance } from "@usedapp/core";
const TokenListing = ({ token, className }: TokenListItemProps) => {
  const { account } = useEthers();
  const balance = useTokenBalance(token.address, account);
  
  return (
    <div
      className={
        (className ? className + " " : "") +
        "flex  flex-row justify-between py-3 cursor-pointer items-center hover:bg-gray-800"
      }
    >
      <div className="flex flex-row">
        {token && (
          <img src={token.logoURI} alt={token.name} className="h-7 mr-2" />
        )}
        <p className="text-[14px] text-white ml-2 mr-2">{token.symbol}</p>
      </div>
      <div className="mr-3 text-right">
          <div>
               <p className="text-inputlabel text-sm">
              {balance ? balance?.toString() : "0"} ({token.symbol})
            </p>
          </div>
        {/* {balance ? (
          <div>
               <p className="text-inputlabel text-sm mt-2">
              {balance ? balance?.toString() : "0"} ({token.symbol})
            </p>
          </div>
        ) : (
          <div className=" flex justify-center items-center my-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-main"></div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TokenListing;
