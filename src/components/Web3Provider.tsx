'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { NeynarProvider } from '@neynar/react';

const config = createConfig(
  getDefaultConfig({
    appName: 'BUILDRS',
    chains: [base],
    transports: {
      [base.id]: http(),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NeynarProvider
          settings={{
            clientId: process.env.NEXT_PUBLIC_NEYNAR_API_KEY!,
            defaultChain: base,
          }}
        >
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </NeynarProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
