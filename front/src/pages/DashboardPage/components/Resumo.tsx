import {
  createStyles,
  ThemeIcon,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
} from '@mantine/core';
import { ReactNode, useContext } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { findMainCategory } from '../../../services/transacao';
import { getSimpleIcon, TipoTransacaoEnum } from '../../../utils/constants';

export function Resumo() {
  const { token } = useContext(AuthContext);

  const { data: receitas, isLoading: isLoadingReceitas } = useQuery(
    ['categoria-receita'],
    () => {
      return findMainCategory(token.token, TipoTransacaoEnum.RECEITA);
    }
  );

  const { data: despesas, isLoading: isLoadingDespesas } = useQuery(
    ['categoria-despesa'],
    () => {
      return findMainCategory(token.token, TipoTransacaoEnum.DESPESA);
    }
  );

  return (
    <Group
      mt={'4rem'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem',
      }}
    >
      {receitas && receitas.data.categoriaName && (
        <ResumoCard
          icon={getSimpleIcon(receitas.data.categoriaName, 'white', 25)}
          color={'green'}
          tipo="receita"
          percent={receitas.data.percent}
          periodo={receitas.data.periodo}
        />
      )}

      {despesas && despesas.data.categoriaName && (
        <ResumoCard
          icon={getSimpleIcon(despesas.data.categoriaName, 'white', 25)}
          color={'red'}
          tipo="despesa"
          percent={despesas.data.percent}
          periodo={despesas.data.periodo}
        />
      )}
    </Group>
  );
}

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'visible',
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  icon: {
    position: 'absolute',
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface ResumoProps {
  icon: ReactNode;
  color: string;
  tipo: string;
  percent: number;
  periodo: number;
}

function ResumoCard({ icon, color, tipo, percent, periodo }: ResumoProps) {
  const { classes } = useStyles();

  return (
    <Paper
      radius="md"
      withBorder
      className={classes.card}
      mt={ICON_SIZE / 3}
      shadow="md"
    >
      <ThemeIcon
        className={classes.icon}
        size={ICON_SIZE}
        radius={ICON_SIZE}
        color={color}
      >
        {icon}
      </ThemeIcon>

      <Text align="center" weight={700} className={classes.title}>
        Principal Categoria de {tipo === 'receita' ? 'Receita' : 'Despesa'}
      </Text>
      <Text color="dimmed" align="center" size="sm"></Text>

      <Group position="center" mt="md">
        <Text size="sm" color="dimmed">
          {Number(percent.toFixed(2))}% das{' '}
          {tipo === 'receita' ? 'receitas' : 'despesas'} nesse periodo
        </Text>
      </Group>

      <Progress value={Number(percent.toFixed(2))} mt={5} />

      <Group position="center" mt="md">
        <Badge size="md">{periodo} meses</Badge>
      </Group>
    </Paper>
  );
}
