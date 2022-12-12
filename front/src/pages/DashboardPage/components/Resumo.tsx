import {
  createStyles,
  ThemeIcon,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
} from '@mantine/core';
import { ReactNode } from 'react';
import { getSimpleIcon } from '../../../utils/constants';

export function Resumo() {
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
      <ResumoCard
        icon={getSimpleIcon('ALIMENTACAO', 'white', 25)}
        color={'red'}
        tipo="despesa"
      />
      <ResumoCard
        icon={getSimpleIcon('PAGAMENTO', 'white', 25)}
        color={'green'}
        tipo="receita"
      />
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
}

function ResumoCard({ icon, color, tipo }: ResumoProps) {
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
          62% das {tipo === 'receita' ? 'receitas' : 'despesas'} nesse periodo
        </Text>
      </Group>

      <Progress value={62} mt={5} />

      <Group position="center" mt="md">
        <Badge size="md">3 meses</Badge>
      </Group>
    </Paper>
  );
}
