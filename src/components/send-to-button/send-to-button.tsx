import { Box, Button, Text, Anchor } from '@mantine/core';
import { useAccount, useEnsAddress, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { useAppStore } from '../../store';
import { isAddress, parseEther } from 'viem';
import { useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useFromTokenBalance } from '../../hooks/use-from-token-balance';
import { formatTokenValue } from '../../utils/format-token-value';
import { getLabel, prepareName } from './helpers';

export const SendToButton = () => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { data: balance } = useFromTokenBalance();

  const amount = useAppStore.use.fromTokenAmount();
  const sendTo = useAppStore.use.sendTo();
  const setFromTokenAmount = useAppStore.use.setFromTokenAmount();
  const sendToAddress = useAppStore.use.sendToAddress();
  const setSendToAddress = useAppStore.use.setSendToAddress();
  const setSendTo = useAppStore.use.setSendTo();
  const { refetch: refetchBalance } = useFromTokenBalance();

  const { data: hash, sendTransaction, isPending, isSuccess } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const name = prepareName(sendTo);
  const { data: ensAddress = '' } = useEnsAddress({
    name,
    query: { enabled: !!name },
  });

  const maxAmount = balance ? formatTokenValue(balance?.value, balance?.decimals) : 0;
  const insufficientFunds = +amount > +maxAmount;
  const isValidAddress = isAddress(sendTo);
  const disabled = !+amount || !sendToAddress || insufficientFunds || isPending;

  const handleButtonClick = () => {
    if (!account.address) {
      return openConnectModal && openConnectModal();
    }

    if (!+amount || !sendToAddress) return;

    sendTransaction({
      to: sendToAddress as `0x${string}`,
      value: parseEther(amount),
    });
  };

  useEffect(() => {
    console.log({ isSuccess });
    if (isSuccess) {
      setFromTokenAmount('');
      setSendTo('');
    }
  }, [isSuccess]);

  useEffect(() => {
    setSendToAddress(ensAddress || (isValidAddress ? sendTo : ''));
  }, [ensAddress, sendTo]);

  useEffect(() => {
    if (isConfirmed) refetchBalance();
  }, [isConfirmed]);

  return (
    <>
      <Button loading={isPending} size="xl" fullWidth disabled={disabled} onClick={handleButtonClick}>
        {getLabel({ walletAddress: account.address, amount, sendToAddress, insufficientFunds })}
      </Button>
      <Box>
        {hash && (
          <Anchor fz={12} target="_blank" href={`https://sepolia.etherscan.io/tx/${hash}`}>
            Transaction
            {isConfirming && <> (Waiting for confirmation)</>}
            {isConfirmed && <> (Confirmed)</>}
          </Anchor>
        )}
      </Box>
    </>
  );
};
