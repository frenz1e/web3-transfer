import { Input, InputLabel, CloseButton } from '@mantine/core';
import { useAppStore } from '../../store/store';

export const SendToAddressInput = () => {
  const setSendTo = useAppStore.use.setSendTo();
  const sendTo = useAppStore.use.sendTo();

  return (
    <>
      <InputLabel>To</InputLabel>
      <Input
        size="xl"
        my="xs"
        placeholder="Wallet address or ENS name"
        flex={1}
        value={sendTo}
        onChange={(e) => setSendTo(e.target.value)}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear send to address"
            onClick={() => setSendTo('')}
            style={{ display: sendTo ? undefined : 'none' }}
          />
        }
      />
    </>
  );
};
