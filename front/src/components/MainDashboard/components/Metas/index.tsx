import { Group, Paper, Progress, Space, Text, ThemeIcon } from '@mantine/core';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { findAllMeta, Meta } from '../../../../services/meta';
import { getSimpleIcon, StatusEnum } from '../TransacaoModals/constants';

export function Metas() {
  const { token } = useContext(AuthContext);

  const { data, isLoading } = useQuery(['metas'], () => {
    return findAllMeta(token.token);
  });

  return (
    <Group
      style={{ width: '100%', justifyContent: 'center' }}
      direction={'row'}
    >
      {data &&
        data.data.length > 0 &&
        data.data.map((el: any) => {
          return <MetaCard meta={el} />;
        })}
    </Group>
  );
}

interface MetaProps {
  meta: Meta;
}

function MetaCard({ meta }: MetaProps) {
  return (
    <Paper p="lg" shadow="md">
      <Group mb=".5rem">
        <ThemeIcon
          size={40}
          radius="xl"
          variant={'outline'}
          style={{
            cursor: 'default',
            backgroundColor: 'blue',
            border: 'none',
          }}
        >
          {getSimpleIcon('CUSTOM', 'white', 30)}
        </ThemeIcon>
        <Text size="xs" color="dimmed">
          {meta.titulo}
        </Text>
      </Group>
      <Text>Valor R${meta.valor}</Text>
      <Space h="sm" />
      <Text>Progresso</Text>
      <Progress value={+meta.progresso} />
      <Text>Prazo {meta.prazo} meses</Text>
    </Paper>
  );
}
