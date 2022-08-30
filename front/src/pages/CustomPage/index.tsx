import {
  Alert,
  Box,
  Button,
  Center,
  Group,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useContext, useEffect } from 'react';
import { BiWallet } from 'react-icons/bi';
import { FiAlertCircle, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { CategoriaList } from '../../components/CategoriaList';
import { Navigation } from '../../components/Navigation';
import AuthContext from '../../context/AuthContext/AuthContext';

export function CustomPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <Navigation>
      <Box style={{ width: '100%', padding: '2rem' }}>
        <CategoriaList />

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
