import { Anchor, Flex } from '@mantine/core';
import { arbitrum, mainnet } from 'viem/chains';

const getTransactionUrl = (hash: `0x${string}`, chainId: number) => {
  if (chainId === mainnet.id) {
    return `https://etherscan.io/tx/${hash}`;
  }
  if (chainId === arbitrum.id) {
    return `https://arbiscan.io/tx/${hash}`;
  }

  return '';
};

export const TransactionItem = ({
  hash,
  chainId,
  isConfirming,
  isConfirmed,
}: {
  hash: `0x${string}`;
  chainId: number;
  isConfirming?: boolean;
  isConfirmed?: boolean;
}) => {
  const url = getTransactionUrl(hash, chainId);

  return (
    url && (
      <Flex>
        <Anchor fz={12} target="_blank" href={url}>
          Last transaction
          {isConfirming && <> (Waiting for confirmation)</>}
          {isConfirmed && <> (Confirmed)</>}
        </Anchor>
      </Flex>
    )
  );
};
