import { Divider, Group, Paper, Skeleton, Text, Space } from '@mantine/core';
import { ReactNode } from 'react';
import { useStyles } from './styles';

interface CardProps {
  color?: string;
  title: string;
  value: string | null;
  valuePrevisto: string | null;
  icon: ReactNode;
  isLoading: boolean;
}

export function Card({
  icon,
  title,
  value,
  valuePrevisto,
  color,
  isLoading,
}: CardProps) {
  const { classes } = useStyles();
  return (
    <Paper
      withBorder
      p="md"
      key={title}
      style={{
        cursor: 'default',
        borderColor: color,
        minWidth: 250,
        minHeight: 150,
      }}
    >
      {isLoading ? (
        <>
          <Skeleton height={40} circle mb="xs" />
          <Skeleton height={10} radius="xl" width={200} />
          <Skeleton height={10} mt={6} radius="xl" width={200} />
          <Skeleton height={10} mt={6} radius="xl" width={200} />
        </>
      ) : (
        <>
          <Group mb=".5rem">
            <Text size="xs" color="dimmed" className={classes.title}>
              {title}
            </Text>
            {icon}
          </Group>
          <Text className={classes.value}>
            {value ? `R$ ${value}` : 'Não consta'}
          </Text>
          <Space h="sm" />
          <Text>
            Valor Previsto{' '}
            {valuePrevisto ? `R$ ${valuePrevisto}` : 'Não consta'}
          </Text>
        </>
      )}
    </Paper>
  );
}
