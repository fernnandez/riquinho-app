import { Box, Center, Group, Stack, Title } from '@mantine/core';
import { MdAttachMoney } from 'react-icons/md';
import {
  TbArrowAutofitUp,
  TbArrowBarUp,
  TbCashBanknoteOff,
} from 'react-icons/tb';
import CustomChart from './CustomChart/CustomChart';

export function Charts() {
  return (
    <>
      <Group
        style={{ width: '100%', justifyContent: 'center' }}
        direction={'row'}
      >
        <Stack align={'center'}>
          <CustomChart />
          <TbArrowBarUp size={25} color="green" />
          <Group direction="row">
            <Title
              sx={(theme) => ({ color: theme.colors.green, cursor: 'default' })}
              order={3}
            >
              Receitas
            </Title>
            <MdAttachMoney size={25} color="green" />
          </Group>
        </Stack>

        <Stack align={'center'}>
          <CustomChart />
          <TbArrowBarUp size={25} color="red" />
          <Group direction="row">
            <Title
              sx={(theme) => ({ color: theme.colors.red, cursor: 'default' })}
              order={3}
            >
              Despesas
            </Title>
            <TbCashBanknoteOff size={25} color="red" />
          </Group>
        </Stack>
      </Group>
    </>
  );
}
