import React from "react";
import Routes from "./Routes";
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
  chains: [bsc],
  transports: {
    [bsc.id]: http('https://binance.llamarpc.com')
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
