import { useEffect, useState } from 'react';
import { useCoinlist } from '../../../hooks/use-coinlist';
import { NATIVE_COIN_ADDRESS } from '../../../constants';
import { mainnet, arbitrum } from 'viem/chains';

export const useCoingeckoId = (address?: string, chainId?: number) => {
  const { data } = useCoinlist(chainId, address);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setId(data && address && chainId ? data?.coingeckoId : null);
    }
  }, [data, address, chainId]);

  if (address === NATIVE_COIN_ADDRESS) {
    switch (chainId) {
      case mainnet.id:
        return 'ethereum';
      case arbitrum.id:
        return 'arbitrum';
    }
  }

  return id;
};
