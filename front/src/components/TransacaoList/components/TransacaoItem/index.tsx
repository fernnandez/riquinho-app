import { ActionIcon, Avatar, Box, Grid, Paper, Text } from '@mantine/core';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useStyles } from './styles';

interface TransacaoItemProps {
  text: string;
  onOpenEdit: (id: string) => void;
}

export function TransacaoItem({ text, onOpenEdit }: TransacaoItemProps) {
  const { classes } = useStyles();

  return (
    <Paper shadow="md" p="1rem" style={{ minWidth: '100%' }}>
      <Grid grow className={classes.listItem} columns={32}>
        <Grid.Col span={2}>
          <Avatar size={60} radius={30} src={null}>
            AF
          </Avatar>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box>
            <Text size="lg">Titulo</Text>
            <Text size="sm" color="dimmed">
              {text}
            </Text>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box className={classes.information}>
            <Box>
              <Text size="lg">Valor</Text>
              <Text size="sm" color="dimmed">
                R$ 950,00
              </Text>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box className={classes.information}>
            <Box>
              <Text size="lg">Data</Text>
              <Text size="sm" color="dimmed">
                02/08/2022
              </Text>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={classes.actions}>
            <ActionIcon
              size="lg"
              color={'blue'}
              radius="xl"
              onClick={() => onOpenEdit('abcdes')}
            >
              <AiFillEdit size={25} />
            </ActionIcon>
            <ActionIcon size="lg" color={'red'} radius="xl">
              <AiFillDelete size={25} />
            </ActionIcon>
          </Box>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
