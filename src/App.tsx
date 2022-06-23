import React from 'react';
import './index.css';
import Swap from './components/Swap';
import { DAppProvider, ChainId } from '@usedapp/core';
import WalletAuthProvider from './providers/wallet-connect-provider';
import { AppProps } from './models/PropTypes';
import { getDefaultProvider } from 'ethers';
const bscProviderURL = 'https://bsc-dataseed1.binance.org:443';
const dappConfig = {
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
  autoConnect: false,
  readOnlyChainId : ChainId.BSC,
  readOnlyUrls: {
    [ChainId.BSC]: bscProviderURL
  }
};

const App = ({domElement} : AppProps) => {
  const tokens = domElement ? domElement.getAttribute('data-tokens') : null;
  return (
    <DAppProvider config={dappConfig}>
      <WalletAuthProvider>
        <Swap tokens={tokens}/>
      </WalletAuthProvider>
    </DAppProvider>
  );
}

export default App;
