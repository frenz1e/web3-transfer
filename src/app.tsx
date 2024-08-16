import '@mantine/core/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { config } from './rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/header/header';
import { SendToCard } from './components/send-to-card';
import { MantineProvider } from '@mantine/core';
import { queryClient } from './api/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as AnkrProvider } from 'ankr-react';
import { ANKR_API_KEY } from './constants';
import './index.css';
import { PreloadData } from './components/preload-data';

const App = () => {
  return (
    <AnkrProvider apiKey={ANKR_API_KEY}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <MantineProvider>
              <PreloadData />
              <Header />
              <SendToCard />
            </MantineProvider>
          </RainbowKitProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </WagmiProvider>
    </AnkrProvider>
  );
};

export default App;
