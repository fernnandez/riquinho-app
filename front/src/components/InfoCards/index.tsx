import { Box } from '@mantine/core';
import { MdAttachMoney } from 'react-icons/md';
import { Card } from './components/Card';

import { HiOutlineCash } from 'react-icons/hi';
import { TbCashBanknoteOff } from 'react-icons/tb';

interface InfoCardsProps {
  isLoading: boolean;
  values: {
    receitas: number;
    despesas: number;
    receitasEfetivadas: number;
    despesasEfetivadas: number;
  } | null;
}

export function InfoCards({ isLoading, values }: InfoCardsProps) {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: '2rem',
      }}
    >
      <Card
        isLoading={isLoading}
        title="Recebido"
        value={values ? String(values.receitasEfetivadas) : null}
        valuePrevisto={values ? String(values.receitas) : null}
        icon={<MdAttachMoney size={25} color="green" />}
        color="green"
      />
      <Card
        isLoading={isLoading}
        title="Saldo"
        value={
          values
            ? String(values.receitasEfetivadas - values.despesasEfetivadas)
            : null
        }
        valuePrevisto={
          values ? String(values.receitas - values.despesas) : null
        }
        icon={<HiOutlineCash size={25} color="blue" />}
        color="blue"
      />
      <Card
        isLoading={isLoading}
        title="Gasto"
        value={values ? String(values.despesasEfetivadas) : null}
        valuePrevisto={values ? String(values.despesas) : null}
        icon={<TbCashBanknoteOff size={25} color="red" />}
        color="red"
      />
    </Box>
  );
}
