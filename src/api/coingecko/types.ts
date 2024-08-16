export type CoinListItem = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  chainId: number;
  logoURI: string | null;
  coingeckoId: string | null;
};
