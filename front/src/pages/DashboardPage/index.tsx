import { Box, Group, ThemeIcon, Title } from '@mantine/core';
import { useContext } from 'react';
import { BiChart } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { Navigation } from '../../components/Navigation';
import AuthContext from '../../context/AuthContext/AuthContext';
import { MonthProvider } from '../../context/MonthContext/MonthContext';
import { findAllTransacao } from '../../services/transacao';
import { Charts } from '../Home/components/Charts';
import { SeletorMes } from '../Home/components/SeletorMes';
import { Compare } from './components/Compare';
import { Resumo } from './components/Resumo';

export function DashboardPage() {
  const { token } = useContext(AuthContext);

  const { data: transacoes, isLoading } = useQuery(['transacoes'], () => {
    return findAllTransacao(token.token);
  });

  return (
    <Navigation>
      <MonthProvider>
        <Box style={{ width: '100%', padding: '1rem' }}>
          <Group
            style={{
              justifyContent: 'center',
            }}
          >
            <SeletorMes />
          </Group>

          <Group align="center" mt="2rem">
            <Title order={2} align="center">
              Valores Categorizados
            </Title>
            <ThemeIcon size={30}>
              <BiChart size={30} />
            </ThemeIcon>
          </Group>
          <Charts transacoes={transacoes?.data} isLoading={isLoading} />

          <Group align="center" mt="2rem">
            <Title order={2} align="center">
              Historico
            </Title>
            <ThemeIcon size={30}>
              <BiChart size={30} />
            </ThemeIcon>
          </Group>

          <Compare />
          <Resumo />
        </Box>
      </MonthProvider>
    </Navigation>
  );
}
