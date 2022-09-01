import {
  AppShell,
  Button,
  Container,
  Group,
  Header,
  Image,
} from '@mantine/core';
import { ReactNode, useContext } from 'react';
import { AiFillWallet } from 'react-icons/ai';
import { BiWallet } from 'react-icons/bi';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
            <Link to="/">
              <Image src={logo} width={200} height={50} />
            </Link>
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
