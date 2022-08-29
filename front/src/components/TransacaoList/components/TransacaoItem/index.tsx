import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Menu,
  Paper,
  Text,
  Tooltip,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { TbDots } from 'react-icons/tb';

import AuthContext from '../../../../context/AuthContext/AuthContext';
import { CategoriaResponse } from '../../../../services/categoria';
import { queryClient } from '../../../../services/queryClient';
import { deleteTransacao } from '../../../../services/transacao';
import { DateFormatter } from '../../../../utils/dateFormatter';
import { notify, TypeNotificationEnum } from '../../../../utils/notify';
import { getCategoriaIcon, StatusEnum } from '../TransacaoModals/constants';
import { useStyles } from './styles';

interface TransacaoItemProps {
  data: {
    id: string;
    titulo: string;
    categoria: CategoriaResponse;
    status: StatusEnum;
    data: Date;
    valor: number;
    descricao: string | null;
  };
  onOpenEdit: (id: string) => void;
}

export function TransacaoItem({ data, onOpenEdit }: TransacaoItemProps) {
  const { classes } = useStyles();
  const { token } = useContext(AuthContext);
  const modals = useModals();

  const handleDelete = () => {
    deleteTransacao(data.id, token.token)
      .then(() => {
        queryClient.invalidateQueries('transacoes').then(() => {
          showNotification(
            notify({
              type: TypeNotificationEnum.SUCCESS,
              title: 'Removido com sucesso',
            })
          );
        });
      })
      .catch((error: any) => {
        showNotification(
          notify({
            type: TypeNotificationEnum.ERROR,
            title:
              error.response && error.response.data.status !== 500
                ? error.response.data.message
                : null,
          })
        );
      });
  };

  const openConfirmDialog = () => {
    return modals.openConfirmModal({
      size: 'lg',
      centered: true,
      title: (
        <Group>
          <ActionIcon size="lg" color={'red'} radius="xl" variant="hover">
            <AiFillDelete size={25} />
          </ActionIcon>
          <Text>Você está prestes a excluir uma transação</Text>
        </Group>
      ),
      children: <Text size="sm">Tem certeza que deseja excluir ?</Text>,
      labels: {
        confirm: 'Excluir',
        cancel: 'Cancelar',
      },
      confirmProps: {
        color: 'red',
        variant: 'light',
      },
      cancelProps: {
        color: 'blue',
        variant: 'light',
      },
      onConfirm: async () => handleDelete(),
    });
  };

  return (
    <Paper
      shadow="md"
      p="1rem"
      style={{ minWidth: '100%' }}
      sx={
        data.status !== StatusEnum.EFETIVADA
          ? { filter: 'brightness(90%)' }
          : { filter: 'brightness(1)' }
      }
    >
      <Grid grow className={classes.listItem} columns={32}>
        <Grid.Col span={2}>
          {getCategoriaIcon(data.categoria, data.status, 60, 45)}
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
          <Menu
            transition="pop"
            withArrow
            placement="end"
            control={
              <ActionIcon color="blue" variant="filled">
                <TbDots />
              </ActionIcon>
            }
          >
            <Menu.Item
              icon={<AiFillEdit size={25} />}
              onClick={() => onOpenEdit(data.id)}
              color="blue"
            >
              Editar
            </Menu.Item>
            <Menu.Item
              icon={<AiFillDelete size={25} />}
              onClick={openConfirmDialog}
              color="red"
            >
              Excluir
            </Menu.Item>
          </Menu>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
