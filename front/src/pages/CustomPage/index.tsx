import {
  ActionIcon,
  Alert,
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
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { BiCategory, BiWallet } from 'react-icons/bi';
import { FiAlertCircle, FiImage, FiUser } from 'react-icons/fi';
import { Navigation } from '../../components/Navigation';

const elements = [
  { tipo: 'RECEITA', symbol: <FiImage />, name: 'Carbon' },
  { tipo: 'RECEITA', symbol: <FiImage />, name: 'Nitrogen' },
  { tipo: 'RECEITA', symbol: <FiImage />, name: 'Yttrium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Barium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Cerium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Cerium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Cerium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Cerium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Cerium' },
  { tipo: 'DESPESA', symbol: <FiImage />, name: 'Cerium' },
];

export function CustomPage() {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>
        <Badge>{element.tipo}</Badge>
      </td>
      <td>
        <ThemeIcon size={30}>{element.symbol}</ThemeIcon>
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
    <Navigation>
      <Box style={{ width: '100%', padding: '2rem' }}>
        <Box mb="xl">
          <Center>
            <Group align="center">
              <Title order={2} align="center">
                Perfil
              </Title>
              <ThemeIcon size={30}>
                <FiUser size={30} />
              </ThemeIcon>
            </Group>
          </Center>
          <Center mt="xl">
            <Group>
              <Button>Ajustar Nome de Usuario</Button>
              <Button variant="light">Redefinir Senha</Button>
              <Button color="red" variant="light">
                Excluir Conta
              </Button>
            </Group>
          </Center>
        </Box>

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
          <Button leftIcon={<AiOutlinePlus />}>Adicionar Nova Categoria</Button>
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
        </Box>

        <Box>
          <Center>
            <Group align="center">
              <Title order={2} align="center">
                Contas | Carteiras
              </Title>
              <ThemeIcon size={30}>
                <BiWallet size={30} />
              </ThemeIcon>
            </Group>
          </Center>

          <Center mt="xl">
            <Alert
              icon={<FiAlertCircle size={16} />}
              title="Em breve!"
              variant="filled"
              style={{ width: '500px' }}
            >
              Estamos trabalhando na funcionalidade de contas
            </Alert>
          </Center>
        </Box>
      </Box>
    </Navigation>
  );
}
