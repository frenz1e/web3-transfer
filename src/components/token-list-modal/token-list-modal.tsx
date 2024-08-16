import { Flex, Text, Modal, useMatches } from '@mantine/core';
import { TokensList } from '../ankr-tokens-list';
import { IconX } from '@tabler/icons-react';
import { Token } from '../../types';

export const TokenListModal = ({
  opened,
  onClose,
  onTokenSelect,
}: {
  opened: boolean;
  onClose: () => void;
  onTokenSelect: (token: Token) => void;
}) => {
  const size = useMatches({
    base: 80,
    sm: 80,
    lg: 60,
    xl: 60,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      radius="lg"
      padding={0}
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.3 }}
    >
      <Flex mih={`${size}vh`} mah={`${size}vh`} direction="column">
        <Flex p="md" align="center" justify="space-between">
          <Text fw={700} fz="h5">
            Select token
          </Text>
          <IconX onClick={onClose} cursor="pointer" />
        </Flex>
        <Flex flex={1} direction="column" style={{ overflow: 'hidden' }}>
          <TokensList onSelect={onTokenSelect} />
        </Flex>
      </Flex>
    </Modal>
  );
};
