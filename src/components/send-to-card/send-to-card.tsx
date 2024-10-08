import { Paper, Box, Flex, Text } from '@mantine/core';
import { TokenSelect } from '../token-select';
import { FromTokenAmount } from '../from-token-amount-input';
import { SendToAddressInput } from '../send-to-address-input';
import { SendToButton } from '../send-to-button';
import { SelectedTokenUsdAmount } from '../selected-token-usd-amount';

export const SendToCard = () => {
  return (
    <Box mx="auto" my="md" maw={460}>
      <Paper shadow="md" radius="lg" p="xl">
        <Flex justify="space-between" align="center">
          <Text fw="bold">Send</Text>
          <SelectedTokenUsdAmount />
        </Flex>
        <FromTokenAmount />
        <Box mt="xs">
          <TokenSelect />
        </Box>
        <Box mt="sm">
          <SendToAddressInput />
        </Box>
        <Box mt="lg">
          <SendToButton />
        </Box>
      </Paper>
    </Box>
  );
};
