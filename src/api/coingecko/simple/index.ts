import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { COINGECKO_NATIVE_COIN_ID, COINGECKO_NETWORK_ID } from '../constants';
import { TokenPriceResponse } from './types';

export const useTokenPrice = (address?: string, chainId?: number) => {
  return useQuery({
    enabled: !!address && !!chainId,
    queryKey: [`simple/token_price`, address],
    queryFn: async () => {
      if (!chainId || !address) return;

      const id = COINGECKO_NETWORK_ID[chainId];

      if (!id) return;

      const { data } = await apiClient.get(`/simple/token_price/${id}`, {
        params: {
          contract_addresses: address,
          vs_currencies: 'usd',
        },
      });

      return data;
    },
    select: (data) => (address ? data[address]?.usd : null),
  });
};

export const useNativeTokenPrice = (chainId?: number) => {
  return useQuery({
    enabled: !!chainId,
    queryKey: ['simple/price', chainId],
    queryFn: async () => {
      if (!chainId) return;

      const id = COINGECKO_NATIVE_COIN_ID[chainId];

      const { data } = await apiClient.get(`/simple/price`, {
        params: {
          ids: id,
          vs_currencies: 'usd',
        },
      });

      return data;
    },
    select: (data: TokenPriceResponse) => {
      const res = Object.values(data)[0];

      return res ? res.usd : null;
    },
  });
};
