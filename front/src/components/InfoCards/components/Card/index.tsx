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

export function Card({ icon, title, value, valuePrevisto, color, isLoading }: CardProps) {
  const { classes } = useStyles();
  return (
    <Paper
      withBorder
      p="md"
      key={title}
      style={{ cursor: 'default', borderColor: color, minWidth: 200 }}
    >
      {isLoading ? (
        <>
          <Skeleton height={30} circle mb="xs" />
          <Skeleton height={8} radius="xl" width={150} />
          <Skeleton height={8} mt={6} radius="xl" width={150} />
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
          <Text >
           Valor Previsto {valuePrevisto ? `R$ ${valuePrevisto}` : 'Não consta'}
          </Text>
        </>
      )}
    </Paper>
  );
}
