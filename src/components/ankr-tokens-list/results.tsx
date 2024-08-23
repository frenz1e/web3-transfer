import { Token } from '../../types';
import { Flex, LoadingOverlay, Text } from '@mantine/core';
import classes from './tokens-list.module.css';
import { useAppStore } from '../../store';
import { useAccountBalance } from 'ankr-react';
import { useAccount } from 'wagmi';
import { AnkrBlockchainParam, NATIVE_COIN_ADDRESS } from '../../constants';
import { Balance } from '@ankr.com/ankr.js/dist/types';
import { useMemo } from 'react';
import { CoinIcon } from '../coin-icon/coin-icon';

export const Results = ({ onClick }: { onClick: (token: Token) => void }) => {
  const searchText = useAppStore.use.fromTokenSearch();
  const { addresses, chainId } = useAccount();
  const { data, isLoading } = useAccountBalance({
    blockchain: AnkrBlockchainParam[chainId || 1],
    walletAddress: addresses ? addresses[0] : '',
  });

  const search = searchText.toLowerCase();
  const assets = useMemo(
    () =>
      (data?.assets || []).filter(
        (item) => item.tokenSymbol.toLowerCase().includes(search) || item.tokenName.toLowerCase().includes(search),
      ),
    [data, search],
  );

  const handleClick = ({ tokenSymbol, tokenName, tokenDecimals, contractAddress }: Balance) => {
    if (!chainId) return;

    onClick({
      symbol: tokenSymbol,
      name: tokenName,
      address: (contractAddress || NATIVE_COIN_ADDRESS) as `0x${string}`,
      decimals: tokenDecimals,
      chainId,
    });
  };

  return (
    <Flex flex={1} direction="column" style={{ overflow: 'auto' }} pos="relative">
      {isLoading ? (
        <LoadingOverlay visible zIndex={10} overlayProps={{ radius: 'sm', blur: 2 }} />
      ) : (
        assets.map((item) => (
          <Flex
            px="lg"
            py="sm"
            key={item.tokenName}
            justify="space-between"
            align="center"
            className={classes.row}
            onClick={() => handleClick(item)}
          >
            <Flex gap="md" align="center">
              {chainId && <CoinIcon symbol={item.tokenSymbol} address={item.contractAddress} chainId={chainId} />}
              <Text fz="h4" fw={500}>
                {item.tokenSymbol}
              </Text>
            </Flex>
            <Flex align="center">
              <Text fz="md" fw={500} c="gray">
                {item.balance}
              </Text>
            </Flex>
          </Flex>
        ))
      )}
    </Flex>
  );
};
