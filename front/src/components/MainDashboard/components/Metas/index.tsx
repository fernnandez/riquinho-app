import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useQuery } from 'react-query';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { useModalController } from '../../../../context/ModalContext/ModalContext';
import { deleteMeta, findAllMeta, Meta } from '../../../../services/meta';
import { queryClient } from '../../../../services/queryClient';
import { deleteTransacao } from '../../../../services/transacao';
import { notify, TypeNotificationEnum } from '../../../../utils/notify';
import { getSimpleIcon } from '../TransacaoModals/constants';
import { EditMetaModal } from './MetaModals/EditMetaModal';

export function Metas() {
  const { token } = useContext(AuthContext);
  const [openedEdit, handlersEdit] = useDisclosure(false);
  const { onSetId } = useModalController();

  const { data, isLoading } = useQuery(['metas'], () => {
    return findAllMeta(token.token);
  });

  const handleOpenEditModal = (id: string) => {
    onSetId(id);
    handlersEdit.open();
  };

  return (
    <Group
      style={{ width: '100%', justifyContent: 'center', marginTop: '2rem' }}
      direction={'row'}
    >
      {data &&
        data.data.length > 0 &&
        data.data.map((el: any) => {
          return <MetaCard meta={el} onOpen={handleOpenEditModal} />;
        })}
      {data && (
        <EditMetaModal
          isOpen={openedEdit}
          onClose={handlersEdit.close}
          metaList={data.data || []}
        />
      )}
    </Group>
  );
}

interface MetaProps {
  meta: Meta;
  onOpen: (id: string) => void;
}

function MetaCard({ meta, onOpen }: MetaProps) {
  const { token } = useContext(AuthContext);
  const modals = useModals();

  const handleDelete = () => {
    deleteMeta(meta.id, token.token)
      .then(() => {
        queryClient.invalidateQueries('metas').then(() => {
          queryClient.invalidateQueries('transacoes').then(() => {
            showNotification(
              notify({
                type: TypeNotificationEnum.SUCCESS,
                title: 'Removido com sucesso',
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
          <Text>Você está prestes a excluir uma meta</Text>
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
      p="md"
      shadow="lg"
      withBorder
      style={{
        cursor: 'default',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 500,
        maxHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Center mb="2rem">
          <ThemeIcon
            size={30}
            radius="xl"
            variant={'outline'}
            mr="xs"
            style={{
              cursor: 'default',
              backgroundColor: 'blue',
              border: 'none',
            }}
          >
            {getSimpleIcon('CUSTOM', 'white', 20)}
          </ThemeIcon>
          <Title order={2} align="center">
            {meta.titulo}
          </Title>
        </Center>
        <Group mb="1rem">
          <Text color="dimmed">Valor</Text>
          <Text size="md">{`R$ ${meta.valor}`}</Text>
        </Group>
        <Group mb="1rem">
          <Text color="dimmed">Prazo</Text>
          <Text size="md">{meta.prazo} meses</Text>
        </Group>
        <Group mb="1rem">
          <Text color="dimmed">Descrição</Text>
          <Text size="md">
            {meta.descricao.trim().length ? meta.descricao : 'Não consta'}
          </Text>
        </Group>
      </Box>
      <Box>
        <Center mb=".5rem">
          <Text>Progresso</Text>
        </Center>
        <Progress value={+meta.progresso} mb="2rem" />
        <Group>
          <Button
            type="submit"
            color="blue"
            variant="light"
            size="xs"
            rightIcon={<AiFillEdit size={25} />}
            onClick={() => onOpen(meta.id)}
          >
            Editar
          </Button>
          <Button
            color="red"
            size="xs"
            variant="subtle"
            rightIcon={<AiFillDelete size={25} />}
            onClick={() => openConfirmDialog()}
          >
            Excluir
          </Button>
        </Group>
      </Box>
    </Paper>
  );
}
