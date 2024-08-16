export const formatUsd = (value: string) => {
  return Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(+value || 0);
};
