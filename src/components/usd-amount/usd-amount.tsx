import { Box, Text } from '@mantine/core';
import { useAppStore } from '../../store';
import { useTokenPrice } from '../../api/coingecko';

export const UsdAmount = () => {
  const tokenAmount = useAppStore.use.fromTokenAmount();
  const token = useAppStore.use.fromToken();
  const { data } = useTokenPrice(token ? token.symbol : undefined);
  console.log('>>>', data);
  const price = 0;

  return (
    <Box mih={19}>
      {tokenAmount && price && <Text fz={12}>${new Intl.NumberFormat('en-US').format(+tokenAmount * price)}</Text>}
    </Box>
  );
};
