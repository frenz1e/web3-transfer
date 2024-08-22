import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { COINGECKO_NETWORK_ID } from '../constants';

export const useTokenPrice = (address?: string, chainId?: number) => {
  return useQuery({
    enabled: !!address && !!chainId,
    queryKey: ['user/token_price', address],
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
