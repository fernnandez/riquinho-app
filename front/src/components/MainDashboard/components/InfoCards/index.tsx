import { Box } from '@mantine/core';
import { MdAttachMoney } from 'react-icons/md';
import { Card } from './components/Card';

import { HiOutlineCash } from 'react-icons/hi';
import { TbCashBanknoteOff } from 'react-icons/tb';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { useQuery } from 'react-query';
import {
  findResumo,
  TransacaoOneParcela,
  TransacaoResponse,
} from '../../../../services/transacao';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import { getValues } from '../../formatter';

interface InfoCardsProps {
  transacoes: TransacaoResponse[];
}

export function InfoCards({ transacoes }: InfoCardsProps) {
  const { token } = useContext(AuthContext);
  const { date } = useMonthController();

  const [resumo, setResumo] = useState<{
    receitas: number;
    receitasEfetivadas: number;
    despesas: number;
    despesasEfetivadas: number;
  } | null>(null);

  useEffect(() => {
    if (transacoes) {
      setResumo(getValues(transacoes, date));
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
        isLoading={false}
        title="Recebido"
        value={resumo ? String(resumo.receitasEfetivadas) : null}
        valuePrevisto={resumo ? String(resumo.receitas) : null}
        icon={<MdAttachMoney size={25} color="green" />}
        color="green"
      />
      <Card
        isLoading={false}
        title="Saldo"
        value={
          resumo
            ? String(resumo.receitasEfetivadas - resumo.despesasEfetivadas)
            : null
        }
        valuePrevisto={
          resumo ? String(resumo.receitas - resumo.despesas) : null
        }
        icon={<HiOutlineCash size={25} color="blue" />}
        color="blue"
      />
      <Card
        isLoading={false}
        title="Gasto"
        value={resumo ? String(resumo.despesasEfetivadas) : null}
        valuePrevisto={resumo ? String(resumo.despesas) : null}
        icon={<TbCashBanknoteOff size={25} color="red" />}
        color="red"
      />
    </Box>
  );
}
