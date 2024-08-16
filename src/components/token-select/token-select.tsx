import { Card, Flex, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { TokenListModal } from '../token-list-modal';
import { Token } from '../../types';
import { useAppStore } from '../../store';
import { CoinIcon } from '../coin-icon/coin-icon';

export const TokenSelect = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const tokenFrom = useAppStore.use.fromToken();
  const setTokenFrom = useAppStore.use.setFromToken();

  const handleSelect = (value: Token) => {
    close();
    setTokenFrom(value);
  };

  return (
    <>
      <Card onClick={open} p="sm" shadow="none" withBorder style={{ cursor: 'pointer' }}>
        <Flex direction="row" align="center" justify="space-between">
          <Flex direction="row" align="center" gap="sm">
            {tokenFrom && (
              <CoinIcon symbol={tokenFrom.symbol} chainId={tokenFrom.chainId} address={tokenFrom.address} />
            )}
            <Text size="xl" fw="600">
              {tokenFrom?.symbol || '-'}
            </Text>
          </Flex>
          <IconChevronDown />
        </Flex>
      </Card>
      <TokenListModal onClose={close} opened={opened} onTokenSelect={handleSelect} />
    </>
  );
};
