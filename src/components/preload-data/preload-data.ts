import { useAccountBalance } from 'ankr-react';
import { useCoinlist } from '../../hooks/use-coinlist';
import { AnkrBlockchainParam } from '../../constants';
import { useAccount } from 'wagmi';

export const PreloadData = () => {
  useCoinlist();

  const account = useAccount();

  useAccountBalance({
    blockchain: AnkrBlockchainParam[account.chainId || 1],
    walletAddress: account.addresses ? account.addresses[0] : '',
  });

  return null;
};
