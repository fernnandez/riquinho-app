import { Box } from '@mantine/core';
import { Card } from './components/Card';
import { MdAttachMoney } from 'react-icons/md';

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
        icon={<MdAttachMoney size={25} color="blue" />}
        color="blue"
      />
      <Card
        title="Despesas"
        value="500"
        icon={<MdAttachMoney size={25} color="red" />}
        color="red"
      />
    </Box>
  );
}
