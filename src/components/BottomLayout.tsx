import { useState } from "react";
import { BottomLayoutProps, SwapInputFieldProps } from "../models/PropTypes";
import SelectTokenButton from "./SelectTokenButton";
import { nullToken } from "../data/frequentlySwappedTokens";

const BottomLayout = ({className, openDialog} : BottomLayoutProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={(className ? className + " " : "") + "relative rounded-t-none rounded-lg shadow-xl text-white  p-3 px-1 text-[12px]  text-justify text-[#C1C1C1]"}>
        <button type="button" className="inline-flex items-center ml-6 m-1 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 mt-2">Fiat Onramp</button>
        <button type="button" className="inline-flex items-center m-1 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50  mt-2">Legal</button>
        <button type="button" className="inline-flex items-center  m-1 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 mt-2">Terms</button>
    </div>
  );
};

export default BottomLayout;