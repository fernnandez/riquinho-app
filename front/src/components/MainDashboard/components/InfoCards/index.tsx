import { Box } from '@mantine/core';
import { MdAttachMoney } from 'react-icons/md';
import { Card } from './components/Card';

import { HiOutlineCash } from 'react-icons/hi';
import { TbCashBanknoteOff } from 'react-icons/tb';
import { useContext } from 'react';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { useQuery } from 'react-query';
import { findResumo } from '../../../../services/transacao';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';

export function InfoCards() {
  const { token } = useContext(AuthContext);
  const { date } = useMonthController();

  const {
    data: resumo,
    isLoading,
    error,
  } = useQuery(['resumo'], () => {
    return findResumo(token.token, date.toJSDate());
  });

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
        value={resumo ? String(resumo.data.receitasEfetivadas) : null}
        valuePrevisto={resumo ? String(resumo.data.receitas) : null}
        icon={<MdAttachMoney size={25} color="green" />}
        color="green"
      />
      <Card
        isLoading={isLoading}
        title="Saldo"
        value={
          resumo
            ? String(
                resumo.data.receitasEfetivadas - resumo.data.despesasEfetivadas
              )
            : null
        }
        valuePrevisto={
          resumo ? String(resumo.data.receitas - resumo.data.despesas) : null
        }
        icon={<HiOutlineCash size={25} color="blue" />}
        color="blue"
      />
      <Card
        isLoading={isLoading}
        title="Gasto"
        value={resumo ? String(resumo.data.despesasEfetivadas) : null}
        valuePrevisto={resumo ? String(resumo.data.despesas) : null}
        icon={<TbCashBanknoteOff size={25} color="red" />}
        color="red"
      />
    </Box>
  );
}
