import React from "react";
import Routes from "./Routes";
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { walletConnect, injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain } from 'viem';

const BotanixTestnet = defineChain({
  id: 3636,
  name: 'BotanixTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://node.botanixlabs.dev']
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://3xpl.com/botanix' },
  },
  testnet: true
})


function App() {

const queryClient = new QueryClient();

const projectId = process.env.REACT_APP_PROJECTID;

const metadata = {
  name: 'Senchat',
  description: 'Senchat a decentralized social media',
  url: 'https://senchatdapp.vercel.app', 
  icons: [process.env.REACT_APP_LOGO]
}

const config = createConfig({
  chains: [BotanixTestnet],
  transports: {
    [BotanixTestnet.id]: http('https://node.botanixlabs.dev')
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
 /*    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    }) */
  ]
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  defaultChain: BotanixTestnet,
//  enableAnalytics: true 
})

  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
    <Routes />
    </QueryClientProvider>
  </WagmiProvider>
  );
}

export default App;
