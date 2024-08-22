import { Card, Flex, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { TokenListModal } from '../token-list-modal';
import { Token } from '../../types';
import { useAppStore } from '../../store';
import { CoinIcon } from '../coin-icon/coin-icon';
import { Balance } from '../balance';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const TokenSelect = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const tokenFrom = useAppStore.use.fromToken();
  const setTokenFrom = useAppStore.use.setFromToken();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleSelect = (value: Token) => {
    close();
    setTokenFrom(value);
  };

  const handleOpen = () => {
    if (!address) return openConnectModal && openConnectModal();

    open();
  };

  return (
    <>
      <Card onClick={handleOpen} p="sm" shadow="none" withBorder style={{ cursor: 'pointer' }}>
        <Flex direction="row" align="center" justify="space-between">
          <Flex direction="row" align="center" gap="sm">
            {tokenFrom && (
              <CoinIcon symbol={tokenFrom.symbol} chainId={tokenFrom.chainId} address={tokenFrom.address} />
            )}
            <Flex direction="column">
              <Text size="md" fw="600">
                {tokenFrom?.symbol || '-'}
              </Text>
              <Balance />
            </Flex>
          </Flex>
          <IconChevronDown />
        </Flex>
      </Card>
      <TokenListModal onClose={close} opened={opened} onTokenSelect={handleSelect} />
    </>
  );
};
