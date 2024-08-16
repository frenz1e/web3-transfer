import { Token } from './types';
import { Blockchain } from '@ankr.com/ankr.js/dist/types';
import { mainnet, arbitrum, Chain, bsc } from 'viem/chains';

export const ANKR_API_KEY = import.meta.env.VITE_ANKR_API_KEY;

if (!ANKR_API_KEY) throw new Error('VITE_ANKR_API_KEY is required');

export const SUPPORTED_CHAINS = [mainnet, arbitrum, bsc] as [Chain, ...Chain[]];
export const SUPPORTED_CHAINS_IDS = SUPPORTED_CHAINS.map((chain) => chain.id);

export const NATIVE_COINS_ADDRESS = '0x0000000000000000000000000000000000000000';

export const DEFAULT_TOKEN: Token = {
  symbol: 'ETH',
  name: 'Ethereum',
  address: '0x0000000000000000000000000000000000000000',
  decimals: 18,
  chainId: 1,
};

export const MAX_TOKEN_DECIMALS = 5;

export const AnkrBlockchainParam: Record<(typeof SUPPORTED_CHAINS_IDS)[number], Blockchain> = {
  [mainnet.id]: 'eth',
  [arbitrum.id]: 'arbitrum',
};
