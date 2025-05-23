import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Group,
  Loader,
  ScrollArea,
  Table,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useContext } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { useQuery } from 'react-query';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { useModalController } from '../../../../context/ModalContext/ModalContext';
import {
  deleteCategoria,
  findAllCategorias,
} from '../../../../services/categoria';
import { queryClient } from '../../../../services/queryClient';
import { getCategoriaIcon, StatusEnum } from '../../../../utils/constants';
import { notify, TypeNotificationEnum } from '../../../../utils/notify';
import { CreateCategoriaModal } from './CreateCategoriaModal';
import { EditCategoriaModal } from './EditCategoriaModal';

export function CategoriaList() {
  const { data, isLoading } = useQuery(['categorias'], () => {
    return findAllCategorias(token.token);
  });

  const { token } = useContext(AuthContext);
  const { onSetId } = useModalController();
  const modals = useModals();

  const [openedCreateCategoria, handlersCreateCategoria] = useDisclosure(false);
  const [openedEditCategoria, handlersEditCategoria] = useDisclosure(false);

  const handleOpenEditModal = (id: string) => {
    onSetId(id);
    handlersEditCategoria.open();
  };

  const handleDelete = (id: string) => {
    deleteCategoria(id, token.token)
      .then(() => {
        queryClient.invalidateQueries('categorias').then(() => {
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

  const openConfirmDialog = (id: string) => {
    return modals.openConfirmModal({
      size: 'lg',
      centered: true,
      title: (
        <Group>
          <ActionIcon size="lg" color={'red'} radius="xl" variant="hover">
            <AiFillDelete size={25} />
          </ActionIcon>
          <Text>Você está prestes a excluir uma Categoria</Text>
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
      onConfirm: async () => handleDelete(id),
    });
  };

  const rows = data?.data.map((element) => (
    <tr key={element.nome}>
      <td>{element.nome}</td>
      <td>
        <Group>
          {element.isForReceita && (
            <Badge variant="filled" color="green">
              Receita
            </Badge>
          )}
          {element.isForDespesa && (
            <Badge variant="filled" color="red">
              Despesa
            </Badge>
          )}
        </Group>
      </td>
      <td>{getCategoriaIcon(element, StatusEnum.EFETIVADA, 35, 25)}</td>
      <td>
        <Group spacing="xs">
          <ActionIcon
            disabled={element.isDefault}
            color="blue"
            onClick={() => {
              handleOpenEditModal(element.id);
            }}
          >
            <AiFillEdit size={25} />
          </ActionIcon>
          <ActionIcon
            disabled={element.isDefault}
            color="red"
            onClick={() => {
              openConfirmDialog(element.id);
            }}
          >
            <AiFillDelete size={25} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Box>
      <Group align="center" mb="2rem">
        <Title order={2} style={{ cursor: 'default' }}>
          Categorias
        </Title>
        <ThemeIcon size={30}>
          <BiCategory size={30} />
        </ThemeIcon>
      </Group>
      <Button
        leftIcon={<AiOutlinePlus />}
        onClick={() => {
          handlersCreateCategoria.open();
        }}
      >
        Adicionar Nova Categoria
      </Button>
      <ScrollArea mt="xl" style={{ height: '400px', backgroundColor: 'white' }}>
        {isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Table verticalSpacing="xs" fontSize="md">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Icon</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </ScrollArea>

      <CreateCategoriaModal
        isOpen={openedCreateCategoria}
        onClose={handlersCreateCategoria.close}
      />
      {data?.data && (
        <EditCategoriaModal
          isOpen={openedEditCategoria}
          onClose={handlersEditCategoria.close}
          categoriaList={data?.data}
        />
      )}
    </Box>
  );
}
