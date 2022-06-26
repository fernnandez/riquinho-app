import { Box } from '@mantine/core';
import { Card } from './components/Card';
import { MdAttachMoney } from 'react-icons/md';

import { TbCashBanknoteOff } from 'react-icons/tb';
import { HiOutlineCash } from 'react-icons/hi';

interface InfoCardsProps {
  isLoading: boolean;
  values: { receitas: number; despesas: number } | null;
}

export function InfoCards({ isLoading, values }: InfoCardsProps) {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Card
        isLoading={isLoading}
        title="Receitas"
        value={values ? String(values.receitas) : null}
        icon={<MdAttachMoney size={25} color="green" />}
        color="green"
      />
      <Card
        isLoading={isLoading}
        title="Balanço"
        value={values ? String(values.receitas - values.despesas) : null}
        icon={<HiOutlineCash size={25} color="blue" />}
        color="blue"
      />
      <Card
        isLoading={isLoading}
        title="Despesas"
        value={values ? String(values.despesas) : null}
        icon={<TbCashBanknoteOff size={25} color="red" />}
        color="red"
      />
    </Box>
  );
}
