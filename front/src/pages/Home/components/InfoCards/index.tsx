import { Box } from '@mantine/core';
import { MdAttachMoney } from 'react-icons/md';
import { Card } from './Card';

import { useEffect, useState } from 'react';
import { HiOutlineCash } from 'react-icons/hi';
import { TbCashBanknoteOff } from 'react-icons/tb';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import { TransacaoResponse } from '../../../../services/transacao';
import { getValues } from '../MainDashboard/formatter';

interface InfoCardsProps {
  transacoes:
    | { receitas: TransacaoResponse[]; despesas: TransacaoResponse[] }
    | undefined;
  isLoading: boolean;
}

export function InfoCards({ transacoes, isLoading }: InfoCardsProps) {
  const { date } = useMonthController();

  const [resumo, setResumo] = useState<{
    receitas: number;
    receitasEfetivadas: number;
    despesas: number;
    despesasEfetivadas: number;
  } | null>(null);

  useEffect(() => {
    if (transacoes) {
      setResumo(
        getValues([...transacoes.despesas, ...transacoes.receitas], date)
      );
    } else {
      setResumo(null);
    }
  }, [date, transacoes]);

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: '2rem',
        gap: '5rem',
      }}
    >
      <Card
        isLoading={isLoading}
        title="Recebido"
        value={resumo ? resumo.receitasEfetivadas.toFixed(2) : null}
        valuePrevisto={resumo ? resumo.receitas.toFixed(2) : null}
        icon={<MdAttachMoney size={25} color="green" />}
        color="green"
      />
      <Card
        isLoading={isLoading}
        title="Saldo"
        value={
          resumo
            ? (resumo.receitasEfetivadas - resumo.despesasEfetivadas).toFixed(2)
            : null
        }
        valuePrevisto={
          resumo ? (resumo.receitas - resumo.despesas).toFixed(2) : null
        }
        icon={<HiOutlineCash size={25} color="blue" />}
        color="blue"
      />
      <Card
        isLoading={isLoading}
        title="Gasto"
        value={resumo ? resumo.despesasEfetivadas.toFixed(2) : null}
        valuePrevisto={resumo ? resumo.despesas.toFixed(2) : null}
        icon={<TbCashBanknoteOff size={25} color="red" />}
        color="red"
      />
    </Box>
  );
}
