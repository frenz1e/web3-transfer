import { Button, Flex, Input, Tooltip } from '@mantine/core';
import { useAppStore } from '../../store/store';
import { onlyNumbers } from '../../utils/only-numbers';
import { useFromTokenBalance } from '../../hooks/use-from-token-balance';
import { formatTokenValue } from '../../utils/format-token-value';
import { IconExclamationCircle } from '@tabler/icons-react';

export const FromTokenAmount = () => {
  const setTokenFromAmount = useAppStore.use.setFromTokenAmount();
  const amount = useAppStore.use.fromTokenAmount();
  const setFromTokenAmount = useAppStore.use.setFromTokenAmount();
  const { data: walletBalance, isFetching } = useFromTokenBalance();

  const balance = walletBalance ? formatTokenValue(walletBalance.value, walletBalance?.decimals) : 0;

  const insufficientFunds = +amount > +balance;

  const showMaxButton = !isFetching && balance && amount !== balance;

  const setMax = () => balance && setFromTokenAmount(balance);

  return (
    <Input
      size="xl"
      my="xs"
      placeholder="0"
      flex={1}
      value={amount}
      onChange={(e) => setTokenFromAmount(onlyNumbers(e.target.value))}
      rightSectionPointerEvents="all"
      rightSectionWidth={insufficientFunds ? 90 : 62}
      rightSection={
        <Flex gap="xs" justify="end" align="center">
          {insufficientFunds ? (
            <Tooltip label="Insufficient funds">
              <IconExclamationCircle color="red" style={{ width: 18, height: 18 }} />
            </Tooltip>
          ) : null}
          {showMaxButton ? (
            <Button size="xs" p={2} m={0} h="auto" fz={12} onClick={setMax}>
              MAX
            </Button>
          ) : null}
        </Flex>
      }
    />
  );
};
