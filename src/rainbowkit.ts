import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { SUPPORTED_CHAINS } from './constants';

export const config = getDefaultConfig({
  appName: 'Swap',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: SUPPORTED_CHAINS,
});
