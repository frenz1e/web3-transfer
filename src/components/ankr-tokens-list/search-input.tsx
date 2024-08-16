import { useState, useRef, useCallback } from 'react';
import _debounce from 'lodash/debounce';
import { Box, Input } from '@mantine/core';

export const SearchInput = ({ onChange }: { onChange: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSetQuery = useCallback(
    _debounce((newQuery) => onChange(newQuery), 300),
    [],
  );

  function setValue(newQuery: string) {
    setInputValue(newQuery);
    debouncedSetQuery(newQuery);
  }

  return (
    <Box px="lg">
      <Input
        size="lg"
        mb="lg"
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search token name or paste address"
        spellCheck={false}
        type="search"
        value={inputValue}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        autoFocus
      />
    </Box>
  );
};
