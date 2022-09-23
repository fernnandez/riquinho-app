import { Box, Center, Group, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { MdAttachMoney } from 'react-icons/md';
import {
  TbArrowAutofitUp,
  TbArrowBarUp,
  TbCashBanknoteOff,
} from 'react-icons/tb';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import { TransacaoResponse } from '../../../../services/transacao';
import { getValuesByCategory } from '../../formatter';
import CustomChart from './CustomChart/CustomChart';

interface ChartsProps {
  transacoes: TransacaoResponse[];
}

export function Charts({ transacoes }: ChartsProps) {
  const { date } = useMonthController();

  const [receitas, setReceitas] = useState<
    {
      name: string;
      value: number;
      color: string;
    }[]
  >([]);
  const [despesas, setDespesas] = useState<
    {
      name: string;
      value: number;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    if (transacoes.length > 0) {
      const { despesaCategoryValue, receitaCategoryValue } =
        getValuesByCategory(transacoes, date);

      setReceitas(receitaCategoryValue);
      setDespesas(despesaCategoryValue);
    }
  }, [transacoes, date]);

  return (
    <>
      <Group
        style={{ width: '100%', justifyContent: 'center' }}
        direction={'row'}
      >
        <Stack align={'center'}>
          <CustomChart data={receitas} />
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
          <CustomChart data={despesas} />
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
