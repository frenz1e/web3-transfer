import BigNumber from 'bignumber.js';

export const formatTokenValue = (value: BigInt, decimals: number, toFixed?: number) => {
  const bn = new BigNumber(value.toString()).div(10 ** decimals);

  if (toFixed) return bn.toFixed(toFixed);

  return bn.toFixed();
};
