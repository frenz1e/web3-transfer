import { Skeleton, Text, TextProps } from '@mantine/core';
import { useTokenPrice } from '../../api/coingecko';

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

  return isLoading ? (
    <Skeleton visible height={15} width={50} />
  ) : (
    !!price && (
      <Text fz={10} c="gray" {...props}>
        ~${price ? new Intl.NumberFormat('en-US').format(+amount * price) : ''}
      </Text>
    )
  );
};
