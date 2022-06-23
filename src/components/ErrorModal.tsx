import { ChangeEvent, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import frequentlySwappedTokens from "../data/frequentlySwappedTokens";
import { IToken } from "../models/Interfaces";
import { ErrorModalProps } from "../models/PropTypes";
import { tokensListAtom } from "../store/atoms";
import ModalBody from "./Modal/ModalBody";
import ModalContainer from "./Modal/ModalContainer";
import ModalFooter from "./Modal/ModalFooter";
import ModalHeader from "./Modal/ModalHeader";
import TokenBadge from "./TokenBadge";
import TokenListing from "./TokenListing";
import { MESSAGE_TYPE } from "../models/Enum";
const ErrorModal = ({
  className,
  closeModal,
  type = MESSAGE_TYPE.ERROR,
  message,
  title,
}: ErrorModalProps) => {
  return (
    <ModalContainer className={className}>
      <ModalHeader closeModal={closeModal}></ModalHeader>
      <ModalBody>
        {type === MESSAGE_TYPE.ERROR && (
          <div className="flex flex-row my-6">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 0.505127C5.45996 0.505127 0.5625 5.40259 0.5625 11.4426C0.5625 17.4827 5.45996 22.3801 11.5 22.3801C17.54 22.3801 22.4375 17.4827 22.4375 11.4426C22.4375 5.40259 17.54 0.505127 11.5 0.505127ZM11.5 20.5247C6.48535 20.5247 2.41797 16.4573 2.41797 11.4426C2.41797 6.42798 6.48535 2.3606 11.5 2.3606C16.5146 2.3606 20.582 6.42798 20.582 11.4426C20.582 16.4573 16.5146 20.5247 11.5 20.5247Z"
                fill="#F87171"
              />
              <path
                d="M10.3281 15.7395C10.3281 16.0503 10.4516 16.3484 10.6714 16.5681C10.8911 16.7879 11.1892 16.9114 11.5 16.9114C11.8108 16.9114 12.1089 16.7879 12.3286 16.5681C12.5484 16.3484 12.6719 16.0503 12.6719 15.7395C12.6719 15.4287 12.5484 15.1306 12.3286 14.9109C12.1089 14.6911 11.8108 14.5676 11.5 14.5676C11.1892 14.5676 10.8911 14.6911 10.6714 14.9109C10.4516 15.1306 10.3281 15.4287 10.3281 15.7395ZM10.9141 13.0051H12.0859C12.1934 13.0051 12.2812 12.9172 12.2812 12.8098V6.16919C12.2812 6.06177 12.1934 5.97388 12.0859 5.97388H10.9141C10.8066 5.97388 10.7188 6.06177 10.7188 6.16919V12.8098C10.7188 12.9172 10.8066 13.0051 10.9141 13.0051Z"
                fill="#F87171"
              />
            </svg>
            <p className="ml-3 text-md text-alert">ERROR</p>
          </div>
        )}
        {type === MESSAGE_TYPE.SUCCESS && (
          <div className="flex flex-row my-6">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 0.447754C5.45996 0.447754 0.5625 5.34521 0.5625 11.3853C0.5625 17.4253 5.45996 22.3228 11.5 22.3228C17.54 22.3228 22.4375 17.4253 22.4375 11.3853C22.4375 5.34521 17.54 0.447754 11.5 0.447754ZM11.5 20.4673C6.48535 20.4673 2.41797 16.3999 2.41797 11.3853C2.41797 6.37061 6.48535 2.30322 11.5 2.30322C16.5146 2.30322 20.582 6.37061 20.582 11.3853C20.582 16.3999 16.5146 20.4673 11.5 20.4673Z"
                  fill="#45F5A1"
                />
                <path
                  d="M10.3281 15.6821C10.3281 15.9929 10.4516 16.291 10.6714 16.5108C10.8911 16.7305 11.1892 16.854 11.5 16.854C11.8108 16.854 12.1089 16.7305 12.3286 16.5108C12.5484 16.291 12.6719 15.9929 12.6719 15.6821C12.6719 15.3713 12.5484 15.0733 12.3286 14.8535C12.1089 14.6337 11.8108 14.5103 11.5 14.5103C11.1892 14.5103 10.8911 14.6337 10.6714 14.8535C10.4516 15.0733 10.3281 15.3713 10.3281 15.6821ZM10.9141 12.9478H12.0859C12.1934 12.9478 12.2812 12.8599 12.2812 12.7524V6.11182C12.2812 6.00439 12.1934 5.9165 12.0859 5.9165H10.9141C10.8066 5.9165 10.7188 6.00439 10.7188 6.11182V12.7524C10.7188 12.8599 10.8066 12.9478 10.9141 12.9478Z"
                  fill="#45F5A1"
                />
              </svg>
            </svg>
            <p className="ml-3 text-md text-[#45F5A1]">SUBMITTED</p>
          </div>
        )}
        <div>
          <p className="text-md text-label">{title}</p>
          <p className="mt-4 text-md text-label">{message}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={() => closeModal()}
          className="block w-full mt-0 bg-main text-center rounded-lg border border-transparent  px-4 py-4 text-xl leading-6 font-medium text-black hover:opacity-90"
        >
          {"Dismiss"}
        </button>
      </ModalFooter>
    </ModalContainer>
  );
};

export default ErrorModal;
