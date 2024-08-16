import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';

export const useChainBalance = (id?: `0x${string}`) => {
  return useQuery({
    enabled: !!id,
    queryKey: ['user/chain_balance', id],
    queryFn: () =>
      apiClient.get(`/user/chain_balance`, {
        params: {
          id,
        },
      }),
  });
};
