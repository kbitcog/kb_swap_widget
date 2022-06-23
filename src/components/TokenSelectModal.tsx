import { ChangeEvent, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import frequentlySwappedTokens from "../data/frequentlySwappedTokens";
import { IToken } from "../models/Interfaces";
import { TokenSelectModalProps } from "../models/PropTypes";
import { tokensListAtom } from "../store/atoms";
import ModalBody from "./Modal/ModalBody";
import ModalContainer from "./Modal/ModalContainer";
import ModalFooter from "./Modal/ModalFooter";
import ModalHeader from "./Modal/ModalHeader";
import SearchInput from "./SearchInput";
import TokenBadge from "./TokenBadge";
import TokenListing from "./TokenListing";
import TokenListItem from "./TokenListItem";
import { PANCAKESWAP_TOKEN_LIST_URL, MAX_TOKEN_LIST } from "../constant";
import { useTokenList } from "@usedapp/core";
const TokenSelectModal = ({
  className,
  closeModal,
  onSelectedToken,
  direction,
}: TokenSelectModalProps) => {
  const { name, logoURI, tokens } =
    useTokenList(PANCAKESWAP_TOKEN_LIST_URL) || {};

  // const tokensList: IToken[] = useRecoilValue(tokensListAtom);
  const [tokenList, setTokenList] = useState([] as IToken[]);
  const [filteredTokens, setFilteredTokens] = useState(tokenList);
  useEffect(() => setFilteredTokens(tokenList), [tokenList]);

  const searchTokens = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = tokenList.filter(
      (token: IToken) =>
        token.symbol.toLowerCase().includes(searchValue) ||
        token.name.toLowerCase().includes(searchValue) ||
        token.address.toLowerCase().includes(searchValue)
    );
    setFilteredTokens(filtered);
  };

  const onSearch = (keyword: string): void => {
    const filtered = tokenList.filter(
      (token: IToken) =>
        token.symbol.toLowerCase().includes(keyword.toLowerCase()) ||
        token.name.toLowerCase().includes(keyword.toLowerCase()) ||
        token.address.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredTokens(filtered);
  };
  useEffect(() => {
    if (tokens) {
      const tokenList = (
        tokens.length > MAX_TOKEN_LIST
          ? tokens.slice(0, MAX_TOKEN_LIST)
          : tokens
      ).map((token: any) => {
        return token as IToken;
      });
      console.log('tokenList: ', tokenList);
      setTokenList(tokenList);
    }
  }, [name, logoURI, tokens]);

  return (
    <ModalContainer className={className}>
      <ModalHeader className="" title="Select a token" closeModal={closeModal}>
      </ModalHeader>
      <ModalBody>
        <div>
          <p className="text-md text-inputlabel">Select a token</p>
        </div>
        {filteredTokens.length > 0 ? (
          <div className="h-80 scrollbar scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 pr-4">
            {filteredTokens.map((token) => (
              <div
                key={token.address}
                onClick={() => {
                  closeModal();
                  onSelectedToken({ token, direction });
                }}
              >
                <TokenListItem
                  token={token}
                  usdValue={3000}
                  onSelectedToken={() => {}}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-white">No results found</p>
          </div>
        )}
      </ModalBody>
      <ModalFooter className="">
        <SearchInput
          onKeywordChange={onSearch}
          placeholder="Search Coin Name"
        ></SearchInput>
      </ModalFooter>
    </ModalContainer>
  );
};

export default TokenSelectModal;
