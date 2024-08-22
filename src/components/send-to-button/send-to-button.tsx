import { Box, Button, Anchor } from '@mantine/core';
import { useAccount, useEnsAddress, useSendTransaction, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useAppStore } from '../../store';
import { isAddress, parseEther } from 'viem';
import { useEffect, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useFromTokenBalance } from '../../hooks/use-from-token-balance';
import { formatTokenValue } from '../../utils/format-token-value';
import { getLabel, prepareName } from './helpers';
import { config } from '../../rainbowkit';
import { erc20Abi } from 'viem';
import { NATIVE_COIN_ADDRESS } from '@src/constants';

export const SendToButton = () => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { data: balance } = useFromTokenBalance();

  const amount = useAppStore.use.fromTokenAmount();
  const sendTo = useAppStore.use.sendTo();
  const fromToken = useAppStore.use.fromToken();
  const fromTokenAddress = fromToken?.address;
  const setFromTokenAmount = useAppStore.use.setFromTokenAmount();
  const sendToAddress = useAppStore.use.sendToAddress();
  const setSendToAddress = useAppStore.use.setSendToAddress();
  const setSendTo = useAppStore.use.setSendTo();
  const { refetch: refetchBalance } = useFromTokenBalance();

  const { sendTransactionAsync, isPending, isSuccess } = useSendTransaction({
    config,
  });

  const { writeContractAsync } = useWriteContract();

  const [hash, setHash] = useState<`0x${string}` | undefined>();

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

  const sendNativeCoin = async () => {
    if (!account.address) {
      return openConnectModal && openConnectModal();
    }

    if (!+amount || !sendToAddress) return;

    try {
      const txId = await sendTransactionAsync({
        to: sendToAddress as `0x${string}`,
        value: parseEther(amount),
      });

      setHash(txId);
    } catch (error) {
      console.info('Error sending transaction', error);
    }
  };

  const sendToken = async () => {
    try {
      const txId = await writeContractAsync({
        address: fromTokenAddress!,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [sendToAddress as `0x${string}`, BigInt(amount)],
      });

      setHash(txId);
    } catch (error) {
      console.info('Error sending transaction', error);
    }
  };

  console.log({ fromTokenAddress });

  const handleSubmitTransaction = () => {
    console.log({ fromTokenAddress });
    if (fromTokenAddress === NATIVE_COIN_ADDRESS) {
      sendNativeCoin();
    } else {
      sendToken();
    }
  };

  useEffect(() => {
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
      <Button loading={isPending} size="xl" fullWidth disabled={disabled} onClick={handleSubmitTransaction}>
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
