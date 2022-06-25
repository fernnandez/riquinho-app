import { Group, Text } from '@mantine/core';
import { forwardRef, ReactNode } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: ReactNode;
  label: string;
}

export const SelectItemIcon = forwardRef<HTMLDivElement, ItemProps>(
  ({ icon, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        {icon}

        <Text size="sm">{label}</Text>
      </Group>
    </div>
  )
);
