import { useEffect, useState } from 'react';
import type { CoinListItem } from '../api/coingecko/types';

type CoinList = Record<string, Record<string, CoinListItem>>;

export const useCoinlist = (chainId?: number, address?: string) => {
  const [coinlist, setCoinlist] = useState<CoinList>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    import('../api/coingecko/coinlist.json')
      .then((data) => {
        setCoinlist(data.default);
      })
      .catch((error) => {
        console.info(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (chainId && address && coinlist[chainId]) return { loading, data: coinlist[chainId][address.toLowerCase()] };

  return { loading, data: null };
};
