import {
  Alert,
  Box,
  Button,
  Center,
  Divider,
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
      <Box style={{ width: '100%', padding: '1rem' }}>
        <CategoriaList />

        <Divider mt="2rem" size="md" color="blue" />

        <Box mt="2rem">
          <Group align="center">
            <Title order={2} style={{ cursor: 'default' }}>
              Perfil
            </Title>
            <ThemeIcon size={30}>
              <FiUser size={30} />
            </ThemeIcon>
          </Group>
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

        <Divider mt="2rem" size="md" color="blue" />

        <Box mt="2rem">
          <Group align="center">
            <Title order={2} style={{ cursor: 'default' }}>
              Contas | Carteiras
            </Title>
            <ThemeIcon size={30}>
              <BiWallet size={30} />
            </ThemeIcon>
          </Group>

          <Center>
            <Alert
              icon={<FiAlertCircle size={16} />}
              title="Em breve!"
              variant="filled"
              style={{ width: '500px' }}
            >
              Estamos trabalhando na funcionalidade de contas para melhorar sua
              experiência na nossa aplicação
            </Alert>
          </Center>
        </Box>
      </Box>
    </Navigation>
  );
}
