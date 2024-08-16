import { useCoinlist } from '../../hooks/use-coinlist';

export const PreloadData = () => {
  useCoinlist();

  return null;
};
