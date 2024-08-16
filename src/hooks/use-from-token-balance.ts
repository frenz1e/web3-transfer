import { useAccount, useBalance } from 'wagmi';
import { useAppStore } from '../store';
import { DEFAULT_TOKEN } from '../constants';

export const useFromTokenBalance = () => {
  const { address } = useAccount();
  const fromToken = useAppStore.use.fromToken();

  return useBalance({
    address,
    ...(fromToken && fromToken.address !== DEFAULT_TOKEN.address
      ? { chainId: fromToken?.chainId, token: fromToken?.address as `0x${string}` }
      : {}),
    query: {
      enabled: !!fromToken,
    },
  });
};
