import { createStyles, Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { ReactNode, useContext } from 'react';
import {
  BsArrowBarLeft,
  BsArrowClockwise,
  BsArrowDownCircleFill,
  BsArrowDownLeft,
  BsArrowRepeat,
  BsArrowUpRight,
} from 'react-icons/bs';
import { HiOutlineCash } from 'react-icons/hi';
import { MdAttachMoney } from 'react-icons/md';
import { TbCashBanknoteOff } from 'react-icons/tb';
import { useQuery } from 'react-query';
import AuthContext from '../../../context/AuthContext/AuthContext';
import { findCompareLastMonth } from '../../../services/transacao';
import { TipoTransacaoEnum } from '../../../utils/constants';

export function Compare() {
  const { token } = useContext(AuthContext);

  const { data: receitas, isLoading: isLoadingReceitas } = useQuery(
    ['resumo-receita'],
    () => {
      return findCompareLastMonth(token.token, TipoTransacaoEnum.RECEITA);
    }
  );

  const { data: despesas, isLoading: isLoadingDespesas } = useQuery(
    ['resumo-despesa'],
    () => {
      return findCompareLastMonth(token.token, TipoTransacaoEnum.DESPESA);
    }
  );

  const { data: metas, isLoading: isLoadingMetas } = useQuery(
    ['resumo-meta'],
    () => {
      return findCompareLastMonth(token.token, TipoTransacaoEnum.META);
    }
  );

  return (
    <Group
      align="center"
      mt="2rem"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem',
      }}
    >
      {receitas?.data && (
        <CompareCard
          title="Receitas"
          diff={receitas.data.diff}
          value={receitas.data.value}
          icon={<MdAttachMoney size={25} color="green" />}
        />
      )}
      {despesas?.data && (
        <CompareCard
          title="Despesas"
          diff={despesas.data.diff}
          value={despesas.data.value}
          icon={<TbCashBanknoteOff size={25} color="red" />}
        />
      )}
      {metas?.data && (
        <CompareCard
          title="Metas"
          diff={metas.data.diff}
          value={metas.data.value}
          icon={<HiOutlineCash size={25} color="blue" />}
        />
      )}
    </Group>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface CompareCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  diff: number;
}

export function CompareCard({ icon, diff, title, value }: CompareCardProps) {
  const { classes } = useStyles();
  const DiffIcon =
    diff === 0 ? BsArrowRepeat : diff > 0 ? BsArrowDownLeft : BsArrowDownLeft;

  return (
    <Paper withBorder p="md" radius="md" key={title} shadow="md">
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {title}
        </Text>
        {icon}
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={classes.value}>R${value}</Text>
        <Text
          color={diff === 0 ? 'blue' : diff > 0 ? 'teal' : 'red'}
          size="sm"
          weight={500}
          className={classes.diff}
        >
          <span>{diff}%</span>
          <DiffIcon size={16} stroke={'1.5'} />
        </Text>
      </Group>

      <Text size="xs" color="dimmed" mt={7}>
        Comparado com o mês anterior
      </Text>
    </Paper>
  );
}
