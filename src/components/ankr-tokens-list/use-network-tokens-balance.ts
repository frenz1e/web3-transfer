import { useAccountBalance } from 'ankr-react';
import { mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';
import { AnkrBlockchainParam } from '../../constants';

export const useNetworkTokensBalance = () => {
  const { chainId, addresses = [] } = useAccount();

  return useAccountBalance({
    blockchain: AnkrBlockchainParam[chainId || mainnet.id],
    walletAddress: addresses[0],
  });
};
