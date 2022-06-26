import {
  ActionIcon,
  Avatar,
  Box,
  Grid,
  Paper,
  Text,
  Tooltip,
} from '@mantine/core';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { DateFormatter } from '../../../../utils/dateFormatter';
import {
  CategoriaEnum,
  getCategoriaIcon,
  StatusEnum,
} from '../TransacaoModals/constants';
import { useStyles } from './styles';

interface TransacaoItemProps {
  data: {
    id: string;
    titulo: string;
    categoria: CategoriaEnum;
    status: StatusEnum;
    data: Date;
    valor: number;
    descricao: string | null;
  };
  onOpenEdit: (id: string) => void;
}

export function TransacaoItem({ data, onOpenEdit }: TransacaoItemProps) {
  const { classes } = useStyles();

  return (
    <Paper shadow="md" p="1rem" style={{ minWidth: '100%' }}>
      <Grid grow className={classes.listItem} columns={32}>
        <Grid.Col span={2}>
          {getCategoriaIcon(data.categoria, data.status)}
        </Grid.Col>
        <Grid.Col span={6}>
          <Box>
            <Tooltip label={data.descricao}>
              <Text size="lg">Titulo</Text>
              <Text size="sm" color="dimmed">
                {data.titulo}
              </Text>
            </Tooltip>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box className={classes.information}>
            <Box>
              <Text size="lg">Valor</Text>
              <Text size="sm" color="dimmed">
                R$ {data.valor}
              </Text>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box className={classes.information}>
            <Box>
              <Text size="lg">Data</Text>
              <Text size="sm" color="dimmed">
                {DateFormatter(data.data.toString())}
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
              onClick={() => onOpenEdit(data.id)}
            >
              <AiFillEdit size={25} />
            </ActionIcon>
            <ActionIcon size="lg" color={'red'} radius="xl" variant="hover">
              <AiFillDelete size={25} />
            </ActionIcon>
          </Box>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
