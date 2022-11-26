import {
  AppShell,
  Button,
  Container,
  Group,
  Header,
  Image,
} from '@mantine/core';
import { ReactNode, useContext } from 'react';
import { BiChart, BiWallet } from 'react-icons/bi';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { GiStairsGoal } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useStyles } from './styles';

interface NavigationProps {
  children: ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { remove } = useContext(AuthContext);

  const handleLogout = () => {
    remove();
    navigate('/login');
  };

  return (
    <AppShell
      header={
        <Header height={80} p="1rem">
          <Container className={classes.header}>
            <Image
              src={logo}
              width={200}
              height={50}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => {
                navigate('/');
              }}
            />
            <Group spacing={5} className={classes.links}>
              <Button
                rightIcon={<BiWallet />}
                variant={useLocation().pathname === '/' ? 'light' : 'outline'}
                onClick={() => {
                  navigate('/');
                }}
              >
                Carteira
              </Button>
              <Button
                rightIcon={<GiStairsGoal />}
                variant={
                  useLocation().pathname === '/metas' ? 'light' : 'outline'
                }
                onClick={() => {
                  navigate('/metas');
                }}
              >
                Metas
              </Button>
              <Button
                rightIcon={<BiChart />}
                variant={
                  useLocation().pathname === '/dashboard' ? 'light' : 'outline'
                }
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                Dashboard
              </Button>
              <Button
                rightIcon={<FiSettings />}
                variant={
                  useLocation().pathname === '/custom' ? 'light' : 'outline'
                }
                onClick={() => {
                  navigate('/custom');
                }}
              >
                Configurações
              </Button>
              <Button
                rightIcon={<FiLogOut />}
                variant="outline"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </Group>
          </Container>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <section className={classes.container}>{children}</section>
    </AppShell>
  );
}
