import { Flex, Skeleton, Text } from '@mantine/core';
import { formatTokenValue } from '../../utils/format-token-value';
import { useFromTokenBalance } from '../../hooks/use-from-token-balance';
import { MAX_TOKEN_DECIMALS } from '../../constants';

export const Balance = () => {
  const { data, isFetching } = useFromTokenBalance();

  const balance = (data && formatTokenValue(data.value, data.decimals, MAX_TOKEN_DECIMALS)) || '';

  return (
    <Flex justify="flex-end" align="center" gap="sm">
      {isFetching ? (
        <Flex align="center" h={20}>
          <Skeleton visible height={15} width={150} />
        </Flex>
      ) : (
        data && (
          <Text size="sm" c="gray">
            Balance: {parseFloat(balance)}
          </Text>
        )
      )}
    </Flex>
  );
};
