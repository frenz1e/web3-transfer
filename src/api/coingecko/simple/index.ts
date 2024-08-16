import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import coinlistJson from '../coinlist.json';
import type { CoinListItem } from '../types';

export const coinlist = coinlistJson as unknown as Record<string, CoinListItem>;
export const useTokenPrice = (symbol?: string) => {
  return useQuery({
    enabled: !!symbol,
    queryKey: ['user/token_price', symbol],
    queryFn: () => {
      const id = symbol ? coinlist[symbol]?.id : '';
      console.log('coinlist', { symbol, coinlist });

      return apiClient.get(`/simple/price`, {
        params: {
          ids: id,
          vs_currencies: 'usd',
        },
      });
    },
  });
};
