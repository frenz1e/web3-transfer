import { useAppStore } from '../../store';
import { UsdAmount } from '../usd-amount';

export const SelectedTokenUsdAmount = () => {
  const tokenAmount = useAppStore.use.fromTokenAmount();
  const token = useAppStore.use.fromToken();

  return tokenAmount && !!token && <UsdAmount amount={+tokenAmount} chainId={token.chainId} address={token.address} />;
};
