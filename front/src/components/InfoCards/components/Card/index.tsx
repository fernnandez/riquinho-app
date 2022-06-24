import { Group, Paper, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { useStyles } from './styles';

interface CardProps {
  color?: string;
  title: string;
  value: string;
  icon: ReactNode;
}

export function Card({ icon, title, value, color }: CardProps) {
  const { classes } = useStyles();
  return (
    <Paper
      withBorder
      p="md"
      key={title}
      style={{ cursor: 'default', borderColor: color }}
    >
      <Group mb=".5rem">
        <Text size="xs" color="dimmed" className={classes.title}>
          {title}
        </Text>
        {icon}
      </Group>
      <Text className={classes.value}>R$ {value}</Text>
    </Paper>
  );
}
