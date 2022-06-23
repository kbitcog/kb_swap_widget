import { ChainId, Fetcher, Percent, Route, Token, TokenAmount, Trade, TradeType } from "@pancakeswap-libs/sdk";
import { ethers } from "ethers"
import { bscProviderURL, pancakeSwapContract } from "../constant"
import { IToken } from "../models/Interfaces";
import { pancakeSwapAbi } from "../utils/TokenPriceAPI";

export const SwapHelper = () => {
    const provider = new ethers.providers.JsonRpcProvider(bscProviderURL);
    const getSwapContract = () => {
        return new ethers.Contract(pancakeSwapContract, pancakeSwapAbi, provider);
    }
    // const getTrade = async (from: IToken, to: IToken, slippage: number): Promise<Trade> => {
    //     const contract = getSwapContract();
    //     const [fromToken, toToken] = await Promise.all([from.address, to.address].map(tokeAddresses => (
    //         new Token(ChainId.MAINNET, tokeAddresses, 18)
    //     )));

    //     const pair = await Fetcher.fetchPairData(fromToken, toToken, provider);
    //     const route = await new Route([pair], fromToken);
    //     const slippageTolerance = new Percent('50', '10000'); 
    //     const trade = await new Trade(route, new TokenAmount(fromToken, 100000), TradeType.EXACT_INPUT);

    //     return trade;
    //     const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw

    // }
}

