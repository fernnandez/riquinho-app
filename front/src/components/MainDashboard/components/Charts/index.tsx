import { Group, Stack, Title } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { MdAttachMoney } from 'react-icons/md';
import { TbArrowBarUp, TbCashBanknoteOff } from 'react-icons/tb';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import { TransacaoResponse } from '../../../../services/transacao';
import { getValuesByCategory } from '../../formatter';
import CustomChart from './CustomChart/CustomChart';

interface ChartsProps {
  transacoes:
    | { receitas: TransacaoResponse[]; despesas: TransacaoResponse[] }
    | undefined;
}

export function Charts({ transacoes }: ChartsProps) {
  const { token } = useContext(AuthContext);
  const { date } = useMonthController();

  const [resumo, setResumo] = useState<{
    despesaCategoryValue: {
      name: string;
      value: number;
      color: string;
    }[];
    receitaCategoryValue: {
      name: string;
      value: number;
      color: string;
    }[];
  } | null>(null);

  useEffect(() => {
    if (transacoes) {
      setResumo(
        getValuesByCategory(transacoes.receitas, transacoes.despesas, date)
      );
    } else {
      setResumo(null);
    }
  }, [date, transacoes]);

  return (
    <>
      <Group
        style={{ width: '100%', justifyContent: 'center' }}
        direction={'row'}
      >
        {resumo && (
          <>
            <Stack align={'center'}>
              <CustomChart data={resumo.receitaCategoryValue} />
              <TbArrowBarUp size={25} color="green" />
              <Group direction="row">
                <Title
                  sx={(theme) => ({
                    color: theme.colors.green,
                    cursor: 'default',
                  })}
                  order={3}
                >
                  Receitas
                </Title>
                <MdAttachMoney size={25} color="green" />
              </Group>
            </Stack>

            <Stack align={'center'}>
              <CustomChart data={resumo.despesaCategoryValue} />
              <TbArrowBarUp size={25} color="red" />
              <Group direction="row">
                <Title
                  sx={(theme) => ({
                    color: theme.colors.red,
                    cursor: 'default',
                  })}
                  order={3}
                >
                  Despesas
                </Title>
                <TbCashBanknoteOff size={25} color="red" />
              </Group>
            </Stack>
          </>
        )}
      </Group>
    </>
  );
}
