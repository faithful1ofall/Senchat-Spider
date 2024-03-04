import React from "react";
import Routes from "./Routes";
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  // 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_PROJECTID;

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http()
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

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true 
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
