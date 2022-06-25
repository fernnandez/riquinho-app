import { Box } from '@mantine/core';
import { Card } from './components/Card';
import { MdAttachMoney } from 'react-icons/md';

import { TbCashBanknoteOff } from 'react-icons/tb';
import { HiOutlineCash } from 'react-icons/hi';

export function InfoCards() {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Card
        title="Receitas"
        value="900"
        icon={<MdAttachMoney size={25} color="green" />}
        color="green"
      />
      <Card
        title="Balanço"
        value="400"
        icon={<HiOutlineCash size={25} color="blue" />}
        color="blue"
      />
      <Card
        title="Despesas"
        value="500"
        icon={<TbCashBanknoteOff size={25} color="red" />}
        color="red"
      />
    </Box>
  );
}
