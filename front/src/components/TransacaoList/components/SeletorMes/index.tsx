import { ActionIcon, Text } from '@mantine/core';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';

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

  const handlePlusDate = () => {
    onSetDate(date.plus({ month: 1 }));
  };

  const handleLessDate = () => {
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
      <Text size="xl" color="blue">
        {MonthName[date.month]} - {date.year}
      </Text>
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
