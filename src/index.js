import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import "./styles/index.css";




import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { publicProvider } from '@wagmi/core/providers/public'



const chains = [sepolia]
const projectId = 'ae64d2d938316ce3350fea4c10f6cc79'

const { publicClient, webSocketPublicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: projectId,
      },
    }),
  ],
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient, webSocketPublicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>

        <App ethereumClient={w3mProvider} />

      </WagmiConfig>

    </Provider>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
