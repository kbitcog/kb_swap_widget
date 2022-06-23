import { ethers } from "ethers";
import { useEffect, useState } from "react";
import pancakeSwapAbi from "../config/pancakeswapabi.json";
import tokenAbi from "../config/tokenabi.json";
import {
  BNBTokenAddress, bscProviderURL, pancakeSwapContract, USDTokenAddress
} from "../constant";
import { IToken } from "../models/Interfaces";
export const useTokenPrice = (token: IToken) => {
  
  const [price, setPrice] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const provider = new ethers.providers.JsonRpcProvider(bscProviderURL);

  useEffect(() => {
    setLoading(true);
    getTokenPrice(token.address);
  }, [token]);

  const getTokenPrice = async (tokenAddress: string) => {
    let bnbPrice = await calcBNBPrice(); 
    console.log(`CURRENT BNB PRICE: ${bnbPrice}`);
    if(tokenAddress === BNBTokenAddress) {
      setPrice(bnbPrice);
      setLoading(false);
      return;
    }
    let tokens_to_sell = 1;
    let priceInBnb = (await calcSell(tokens_to_sell, tokenAddress)) / tokens_to_sell; 
    setPrice(priceInBnb * bnbPrice);
    setLoading(false);
    // console.log(`TOKEN VALUE IN USD: ${priceInBnb * bnbPrice}`); 
  };

  async function calcSell(tokensToSell: number, tokenAddres: string) {
    const tokenInstance = await new ethers.Contract(
      tokenAddres,
      tokenAbi,
      provider
    );
    let tokenDecimals = await tokenInstance.decimals();
    let _tokensToSell = setDecimals(tokensToSell, tokenDecimals);
    let amountOut;
    try {
      let router = await new ethers.Contract(
        pancakeSwapContract,
        pancakeSwapAbi,
        provider
      );
      amountOut = await router.getAmountsOut(_tokensToSell, [
        tokenAddres,
        BNBTokenAddress,
      ]);
      amountOut = ethers.utils.formatUnits(amountOut[1], 18);
    } catch (error) {
      setLoading(false);
    }

    if (!amountOut) return 0;
    return amountOut;
  }

  async function calcBNBPrice() {
    let bnbToSell = ethers.utils.parseUnits("1", "ether");
    let amountOut;
    try {
      let router = await new ethers.Contract(
        pancakeSwapContract,
        pancakeSwapAbi,
        provider
      );
      amountOut = await router.getAmountsOut(bnbToSell, [
        BNBTokenAddress,
        USDTokenAddress,
      ]);
      amountOut = ethers.utils.formatUnits(amountOut[1], 18);
    } catch (error) {
      console.log("calc BNB price failed price:", error);
      setLoading(false);
    }
    if (!amountOut) return 0;
    return amountOut;
  }
  function setDecimals(number: number, decimals: number): string {
    let _number = number.toString();
    let numberAbs = _number.split(".")[0];
    let numberDecimals = _number.split(".")[1] ? _number.split(".")[1] : "";
    while (numberDecimals.length < decimals) {
      numberDecimals += "0";
    }
    return numberAbs + numberDecimals;
  }

  return { price, bnbPrice, loading};
};
