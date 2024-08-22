import { Skeleton, Text, TextProps } from '@mantine/core';
import { useNativeTokenPrice, useTokenPrice } from '../../api/coingecko';
import { NATIVE_COIN_ADDRESS } from '@src/constants';

export const UsdAmount = ({
  amount,
  address,
  chainId,
  ...props
}: {
  amount: number;
  address: `0x${string}`;
  chainId: number;
} & TextProps) => {
  const { data: price, isLoading } = useTokenPrice(address, chainId);
  const { data: nativePrice, isLoading: nativeIsLoading } = useNativeTokenPrice(chainId);
  const _price = address === NATIVE_COIN_ADDRESS ? nativePrice : price;

  return isLoading || nativeIsLoading ? (
    <Skeleton visible height={15} width={50} />
  ) : (
    !!_price && (
      <Text fz={10} c="gray" {...props}>
        ~${_price ? new Intl.NumberFormat('en-US').format(+amount * _price) : ''}
      </Text>
    )
  );
};
