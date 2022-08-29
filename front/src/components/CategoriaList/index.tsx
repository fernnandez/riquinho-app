import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Group,
  ScrollArea,
  Table,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import {
  AiFillCustomerService,
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
} from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FiImage } from 'react-icons/fi';
import { useQuery } from 'react-query';
import AuthContext from '../../context/AuthContext/AuthContext';
import { findAllCategorias } from '../../services/categoria';
import { CreateCategoriaModal } from './components/CreateCategoriaModal';

const elements = [
  { tipo: 'RECEITA', symbol: <FiImage />, name: 'Carbon' },
  { tipo: 'RECEITA', symbol: <FiImage />, name: 'Nitrogen' },
  { tipo: 'RECEITA', symbol: <FiImage />, name: 'Yttrium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Barium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Cerium' },
];

export function CategoriaList() {
  const { token } = useContext(AuthContext);
  const [openedCreateCategoria, handlersCreateCategoria] = useDisclosure(false);

  const { data, isLoading, error } = useQuery(['categorias'], () => {
    return findAllCategorias(token.token);
  });

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
      <td>
        <ThemeIcon size={30}>
          <AiFillCustomerService />
        </ThemeIcon>
      </td>
      <td>
        <Group spacing="xs">
          <ActionIcon color="blue">
            <AiFillEdit size={25} />
          </ActionIcon>
          <ActionIcon color="red">
            <AiFillDelete size={25} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Box mb="xl">
      <Center>
        <Group align="center">
          <Title order={2} align="center">
            Categorias
          </Title>
          <ThemeIcon size={30}>
            <BiCategory size={30} />
          </ThemeIcon>
        </Group>
      </Center>
      <Button
        leftIcon={<AiOutlinePlus />}
        onClick={() => {
          handlersCreateCategoria.open();
        }}
      >
        Adicionar Nova Categoria
      </Button>
      <ScrollArea mt="xl" style={{ height: '300px' }}>
        <Table>
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
      </ScrollArea>

      <CreateCategoriaModal
        isOpen={openedCreateCategoria}
        onClose={handlersCreateCategoria.close}
      />
    </Box>
  );
}
