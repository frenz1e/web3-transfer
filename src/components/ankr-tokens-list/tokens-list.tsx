import { Results } from './results';
import { SearchInput } from './search-input';
import { Token } from '../../types';
import { Box } from '@mantine/core';
import { useAppStore } from '../../store';

export const TokensList = ({ onSelect }: { onSelect: (value: Token) => void }) => {
  const setFromTokenSearch = useAppStore.use.setFromTokenSearch();

  return (
    <>
      <SearchInput onChange={setFromTokenSearch} />
      <Box style={(theme) => ({ borderBottom: `1px solid ${theme.colors.gray[2]}` })} />
      <Results onClick={onSelect} />
    </>
  );
};
