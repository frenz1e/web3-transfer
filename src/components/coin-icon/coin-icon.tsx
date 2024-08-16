import { Avatar, AvatarProps } from '@mantine/core';
import { useCoinlist } from '../../hooks/use-coinlist';
import { mainnet, bsc, arbitrum } from 'viem/chains';
import { NATIVE_COINS_ADDRESS } from '../../constants';

const eth: Record<number, boolean> = {
  [mainnet.id]: true,
  [bsc.id]: true,
  [arbitrum.id]: true,
};

const getNativeCoinLogo = (chainId: number) => {
  if (eth[chainId]) return 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png';

  return '';
};

export const CoinIcon = ({
  chainId,
  address,
  symbol,
  ...props
}: { chainId: number; symbol: string; address?: string } & AvatarProps) => {
  const { data } = useCoinlist(chainId, address);

  const src = address && address !== NATIVE_COINS_ADDRESS ? data?.logoURI : getNativeCoinLogo(chainId);

  return (
    <Avatar src={src} name={address} {...props}>
      {symbol}
    </Avatar>
  );
};
