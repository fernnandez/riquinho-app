import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Menu,
  MenuItem,
  Paper,
  Text,
  Tooltip,
  Switch,
  Checkbox,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { BaseSyntheticEvent, useContext, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { TbCheck, TbDots } from 'react-icons/tb';

import AuthContext from '../../../../../context/AuthContext/AuthContext';
import { CategoriaResponse } from '../../../../../services/categoria';
import { queryClient } from '../../../../../services/queryClient';
import {
  deleteTransacao,
  updateStatus,
} from '../../../../../services/transacao';
import { DateFormatter } from '../../../../../utils/dateFormatter';
import { notify, TypeNotificationEnum } from '../../../../../utils/notify';
import {
  getCategoriaIcon,
  StatusEnum,
  TipoTransacaoEnum,
} from '../../TransacaoModals/constants';
import { useStyles } from './styles';

interface TransacaoItemProps {
  data: {
    id: string;
    titulo: string;
    categoria: CategoriaResponse;
    descricao: string | null;
    parcelado: boolean;
    tipo: TipoTransacaoEnum;
    parcela: {
      id: string;
      status: StatusEnum;
      data: Date;
      valor: number;
    };
  };
  onOpenEdit: (id: string) => void;
}

export function TransacaoItem({ data, onOpenEdit }: TransacaoItemProps) {
  const { classes } = useStyles();
  const { token } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
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

  const handleStatus = () => {
    setLoading(true);
    updateStatus(data.id, data.parcela.id, token.token)
      .then(() => {
        queryClient.invalidateQueries('transacoes').then(() => {
          queryClient.invalidateQueries('metas').then(() => {
            showNotification(
              notify({
                type: TypeNotificationEnum.SUCCESS,
                title: 'Atualizado com sucesso.',
              })
            );
          });
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
      })
      .finally(() => {
        setLoading(false);
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
    <tr key={data.parcela.id}>
      <td>{getCategoriaIcon(data.categoria, data.parcela.status, 40, 25)}</td>
      <td>
        <Tooltip label={data.descricao}>
          <Text size="sm" color="dimmed">
            {data.titulo}
          </Text>
        </Tooltip>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {Number(data.parcela.valor).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
          {/* ajustar os valores monetários da aplicação */}
        </Text>
      </td>

      <td>
        <Box className={classes.information}>
          <Text size="sm" color="dimmed">
            {DateFormatter(data.parcela.data.toString())}
          </Text>
        </Box>
      </td>
      <td>
        <Box className={classes.information}>
          <Text size="sm" color="dimmed">
            {data.parcelado ? 'Sim' : 'Não'}
          </Text>
        </Box>
      </td>
      <td>
        <Tooltip label="trocar status">
          <ActionIcon
            mr={'sm'}
            color={
              data.parcela.status === StatusEnum.EFETIVADA ? 'green' : 'red'
            }
            variant="filled"
            size="md"
            onClick={handleStatus}
            disabled={isLoading}
          >
            <TbCheck />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          label={
            data.tipo === TipoTransacaoEnum.META
              ? 'Não é possivel editar ou excluir transações de Meta'
              : 'Ações'
          }
        >
          <Menu
            transition="pop"
            withArrow
            placement="end"
            control={
              <ActionIcon color="blue" variant="filled" size="md">
                <TbDots />
              </ActionIcon>
            }
          >
            <Menu.Item
              icon={<AiFillEdit size={25} />}
              onClick={() => onOpenEdit(data.id)}
              color="blue"
              disabled={data.tipo === TipoTransacaoEnum.META}
            >
              Editar
            </Menu.Item>
            <Menu.Item
              icon={<AiFillDelete size={25} />}
              onClick={openConfirmDialog}
              color="red"
              disabled={data.tipo === TipoTransacaoEnum.META}
            >
              Excluir
            </Menu.Item>
          </Menu>
        </Tooltip>
      </td>
    </tr>
  );
}
