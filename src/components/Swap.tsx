import { useEffect, useState, useContext } from "react";
import { FaWallet, FaSort, FaSignOutAlt } from "react-icons/fa";
import { ISwapTokenParams } from "../models/Interfaces";
import SwapInputField from "../components/SwapInputField";
import { SWAP_DIRECTION } from "../models/Enum";
import { useRecoilState } from "recoil";
import { currentSwapAtom, userAccountAtom } from "../store/atoms";


import Logo from "../assets/images/logo.svg";
import SwapIcon from "../assets/images/icon_swap.svg";
import WalletIcon from "../assets/images/icon_wallet.svg";
import HelpIcon from "../assets/images/icon_help.svg";
import BottomLayout from "./BottomLayout";
import { ethers } from "ethers";
import { WalletConnectContext } from "../context";
import { SwapProps } from "../models/PropTypes";
import Switch from "./Switch";
import Tooltip from "./Tooltip";
import ErrorModal from "./ErrorModal";
import TokenSelectModal from "./TokenSelectModal";
import { useToken } from "@usedapp/core";
import { MESSAGE_TYPE } from "../models/Enum";
const Swap = ({ tokens }: SwapProps) => {
  const {
    account,
    active,
    activateProvider,
    activateBrowserWallet,
    error,
    loading,
    deactivate,
  } = useContext(WalletConnectContext);

  useEffect(() => {
    if (!active && !error) {
      activateProvider();
    }

    // alertError(
    //   "This transaction cannot succeed due to error:",
    //   "SLIPPAGE_LOW. There is an issue with your set slippage tolerance"
    // );
    // alertError("Transaction was successful", "", MESSAGE_TYPE.SUCCESS);
  }, []);

  useEffect(() => {
    console.log("tokens:", tokens);
  }, [tokens]);

  const [currentSwap, setCurrentSwap] = useRecoilState(currentSwapAtom);
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);

  //advanced setting
  const toleranceItems = ["2%", "3%", "Custom%"];
  const [selSlippage, setSelSlippage] = useState(toleranceItems[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // price estimation

  //showing error modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errTitle, setErrTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [messageType, setMessageType] = useState(MESSAGE_TYPE.ERROR);
  //token selection modalBody
  const [showTokenSelectModal, setShowTokenSelectModal] = useState(false);
  const [tokenDirection, setTokenDirection] = useState(SWAP_DIRECTION.FROM);

  //token price updatePriceEstimation
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [mimimumReceived, setMinimumReceived] = useState(0);

  const switchTokens = () => {
    const temp = currentSwap.from;
    setCurrentSwap({ ...currentSwap, from: currentSwap.to, to: temp });
  };

  const setSwapParams = ({ token, direction }: ISwapTokenParams): void => {
    if (direction === SWAP_DIRECTION.FROM) {
      setCurrentSwap({ ...currentSwap, from: token });
    } else {
      setCurrentSwap({ ...currentSwap, to: token });
    }
  };
  const alertError = (
    title: string,
    message: string,
    type: MESSAGE_TYPE = MESSAGE_TYPE.ERROR
  ) => {
    setErrMessage(message);
    setErrTitle(title);
    setShowErrorModal(true);
    setMessageType(type);
  };

  const handleSwap = () => {};
  const toggled = (isToggled: boolean) => {};

  const onSelectedToken = ({ token, direction }: ISwapTokenParams) => {
    if (direction === SWAP_DIRECTION.FROM) {
      setCurrentSwap({ ...currentSwap, from: token });
    } else {
      setCurrentSwap({ ...currentSwap, to: token });
    }
    updatePriceEstimation();
  };

  const onOpenTokenList = (direction: SWAP_DIRECTION) => {
    setShowTokenSelectModal(true);
    setTokenDirection(direction);
  };

  const onUpdateTokenPrice = (
    price: number,
    loading: boolean,
    direction: SWAP_DIRECTION
  ) => {
    if (direction === SWAP_DIRECTION.FROM) {
      if (loading) setFromPrice(0);
      if (price > 0) setFromPrice(price);
    }
    if (direction === SWAP_DIRECTION.To) {
      if (loading) setToPrice(0);
      if (price > 0) setToPrice(price);
    }
  };
  const updatePriceEstimation = () => {
    //calculating route

  };

  return (
    <div className="flex justify-center mt-10 mx-auto lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4 bg-black">
      <div className="bg-gradient-to-b from-[rgba(19,26,20,1)] to-[rgba(8,8,8,0)] shadow-xl p-10 min-w-md max-w-md">
        <div className="flex flex-row justify-between items-center">
          <div></div>
          <div className="mr-2 ml-5">
            <button
              className="flex justify-between bg-main rounded-lg  px-4 py-1 text-black hover:opacity-90"
              onClick={() => activateBrowserWallet()}
            >
              <img src={WalletIcon} className="h-[17px] w-auto my-auto"></img>
              {account ? (
                <p className="text-black ml-4 text-sm">
                  {account.substring(0, 4) +
                    "...." +
                    account.substring(account.length - 4, account.length)}
                </p>
              ) : (
                <p className="text-black ml-4 text-sm font-medium">CONNECT</p>
              )}
            </button>
          </div>
        </div>
        <div className="pt-10">
          <SwapInputField
            token={currentSwap.from}
            direction={SWAP_DIRECTION.FROM}
            className=""
            setSwapParams={setSwapParams}
            onOpenTokenList={onOpenTokenList}
            onUpdateTokenPrice={onUpdateTokenPrice}
          />
          <div
            className="flex flex-row items-start my-5"
            onClick={switchTokens}
          >
            <img src={SwapIcon} className="h-[30px] w-auto m-auto"></img>
          </div>
          <SwapInputField
            token={currentSwap.to}
            direction={SWAP_DIRECTION.To}
            className=""
            setSwapParams={setSwapParams}
            onOpenTokenList={onOpenTokenList}
            onUpdateTokenPrice={onUpdateTokenPrice}
          />
          <div className="mt-3">
            <div className="flex flex-row justify-between items-center">
              <p className="text-label text-sm">PRICE</p>
              {fromPrice !== 0 && toPrice !== 0 && (
                <div className="flex flex-row">
                  <p className="text-white text-sm">{`1${
                    currentSwap.from.symbol
                  } = ${(fromPrice / toPrice)}${
                    currentSwap.to.symbol
                  }`}</p>
                  <p className="text-label text-sm">{`~$(${fromPrice
                  })`}</p>
                </div>
              )}
            </div>
            <div className="flex flex-row justify-between items-center mt-2">
              <p className="text-label text-sm">Minimum Received</p>
              <div className="flex flex-row">
                <p className="text-white text-sm">8.248445ETH</p>
                <p className="text-label text-sm">(~$15,350)</p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-2">
              <div className="flex flex-row">
                <p className="text-label text-sm">Gas Price</p>
                <Tooltip message="This is the maximum percentage you are willing to lose due to unfavorable price changes">
                  <img src={HelpIcon} className="h-[19px] w-auto ml-2"></img>
                </Tooltip>
              </div>
              <p className="text-white text-sm">250 GWEI</p>
            </div>
            <p className="text-label text-xs mt-3">
              End price is an estimate. You will receive at least 8.248445 ETH
              (~$15,350) or the transaction will be refunded.
            </p>
          </div>
          <div
            className="flex flex-row items-center mt-3"
            onClick={() => {
              setShowAdvanced(!showAdvanced);
            }}
          >
            <p className="text-main text-md mr-3">ADVANCED</p>
            <svg
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.40565 0.198781C1.04222 -0.104651 0.502214 -0.0549359 0.198782 0.308497C-0.104651 0.671931 -0.0549358 1.21279 0.308498 1.51537L4.59427 5.80114C4.63455 5.83543 4.68255 5.85171 4.72713 5.87743C4.76227 5.898 4.79313 5.922 4.8317 5.93743C4.93199 5.97686 5.03656 6 5.14285 6C5.24913 6 5.35371 5.97686 5.45399 5.93743C5.49257 5.922 5.52342 5.898 5.55857 5.87743C5.60314 5.85171 5.65114 5.83543 5.69142 5.80114L9.97719 1.51537C10.3415 1.21279 10.3903 0.671931 10.0869 0.308497C9.78434 -0.0549359 9.24433 -0.104651 8.88004 0.198781L6 3.31282L5.14292 4.1699L4.28377 3.31074L1.40565 0.198781Z"
                fill="#45F5A1"
              />
            </svg>
          </div>
          <div
            className={`${
              showAdvanced ? "block" : "hidden"
            } my-4 px-3 py-4 rounded-md border border-solid border-[#CCCED9]/[0.15] `}
          >
            <p className="text-label text-sm">Transaction settings</p>
            <div className="flex justify-between items-center my-5">
              <div className="flex flex-row">
                <p className="text-label text-sm">Slippage Tolerance</p>
                <Tooltip message="This is the maximum percentage you are willing to lose due to unfavorable price changes">
                  <img src={HelpIcon} className="h-[19px] w-auto ml-2"></img>
                </Tooltip>
              </div>
              <div className="flex flex-row">
                {toleranceItems.map((item, index) => {
                  return (
                    <button
                      className={
                        (selSlippage == item
                          ? "text-black bg-main"
                          : "text-label") +
                        " text-sm rounded-md px-1 mx-1 border border-solid border-[#CCCED9]/[0.15] hover:bg-gray-10"
                      }
                      onClick={() => {
                        setSelSlippage(toleranceItems[index]);
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between items-center my-5">
              <div className="flex flex-row">
                <p className="text-label text-sm">Allowance</p>
                <img src={HelpIcon} className="h-[19px] w-auto ml-2"></img>
              </div>
              <Switch toggled={toggled} label="Infinite" />
            </div>
            {/* <div className="flex justify-between items-center my-5">
                <p className="text-label text-sm">Estimated Gas Fee</p>
                <p className="text-label text-sm">3%</p>
              </div> */}
          </div>
          <div className="mt-8 mb-6">
            <button
              onClick={() => {
                // alertError(
                //   "This transaction cannot succeed due to error:",
                //   "SLIPPAGE_LOW. There is an issue with your set slippage tolerance"
                // );
              }}
              className={` ${
                !account && "disabled"
              } block w-full mt-0 bg-main text-center rounded-lg border border-transparent  px-4 py-4 text-xl leading-6 font-medium text-black hover:opacity-90`}
            >
              {"SWAP"}
            </button>
          </div>
        </div>
        {/* <BottomLayout openDialog={() => { }} /> */}
        <ErrorModal
          className={showErrorModal ? "block" : "hidden"}
          type={messageType}
          title={errTitle}
          message={errMessage}
          closeModal={() => {
            setShowErrorModal(false);
          }}
        />
        <TokenSelectModal
          className={showTokenSelectModal ? "block" : "hidden"}
          onSelectedToken={onSelectedToken}
          closeModal={() => {
            setShowTokenSelectModal(false);
          }}
          direction={tokenDirection}
        ></TokenSelectModal>
        ;
      </div>
    </div>
  );
};

export default Swap;
