import { Token } from './types';
import { Blockchain } from '@ankr.com/ankr.js/dist/types';
import { mainnet, arbitrum, Chain } from 'viem/chains';

export const ANKR_API_KEY = import.meta.env.VITE_ANKR_API_KEY;

if (!ANKR_API_KEY) throw new Error('VITE_ANKR_API_KEY is required');

export const SUPPORTED_CHAINS = [mainnet, arbitrum] as [Chain, ...Chain[]];
export const SUPPORTED_CHAINS_IDS = [mainnet.id, arbitrum.id] as const;

export const NATIVE_COIN_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`;

export const DEFAULT_TOKEN: Token = {
  symbol: 'ETH',
  name: 'Ethereum',
  address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  decimals: 18,
  chainId: 1,
};

export const MAX_TOKEN_DECIMALS = 5;

export const AnkrBlockchainParam: Record<number, Blockchain> = {
  [mainnet.id]: 'eth',
  [arbitrum.id]: 'arbitrum',
};
