import { ActionIcon, Title } from '@mantine/core';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import { queryClient } from '../../../../services/queryClient';

const MonthName = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
};

export function SeletorMes() {
  const { date, onSetDate } = useMonthController();

  const handlePlusDate = async () => {
    onSetDate(date.plus({ month: 1 }));
  };

  const handleLessDate = async () => {
    onSetDate(date.plus({ month: -1 }));
  };

  return (
    <>
      <ActionIcon
        onClick={handleLessDate}
        size={35}
        color="blue"
        variant="filled"
      >
        <BsChevronLeft size={25} />
      </ActionIcon>
      <Title
        ml={'10rem'}
        mr={'10rem'}
        order={2}
        sx={(theme) => ({ color: theme.colors.blue, cursor: 'default' })}
      >
        {MonthName[date.month]} - {date.year}
      </Title>
      <ActionIcon
        onClick={handlePlusDate}
        size={35}
        color="blue"
        variant="filled"
      >
        <BsChevronRight size={25} />
      </ActionIcon>
    </>
  );
}
