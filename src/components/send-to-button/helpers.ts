import { normalize } from 'viem/ens';

export const getLabel = ({
  walletAddress,
  amount,
  sendToAddress,
  insufficientFunds,
}: {
  walletAddress?: `0x${string}`;
  amount: string;
  sendToAddress: string;
  insufficientFunds: boolean;
}) => {
  if (!walletAddress) return 'Connect wallet';
  if (!+amount) return 'Input amount';
  if (insufficientFunds) return 'Insufficient funds';
  if (!sendToAddress) return 'Invalid recipient';

  return 'Send';
};

export const prepareName = (name: string) => {
  name = !name.includes('.') ? `${name}.eth` : name;

  return isValidDomain(name) ? normalize(name) : '';
};

export const isValidDomain = (value: string): boolean => {
  const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/;
  return domainRegex.test(value);
};
