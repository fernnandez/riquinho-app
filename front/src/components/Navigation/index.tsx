import {
  AppShell,
  Button,
  Container,
  Group,
  Header,
  Image,
} from '@mantine/core';
import { ReactNode, useContext } from 'react';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
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
        <Header height={60}>
          <Container className={classes.header}>
            <Link to="/">
              <Image src={logo} width={200} height={50} />
            </Link>
            <Group spacing={5} className={classes.links}>
              <Button
                rightIcon={<FiSettings />}
                variant="light"
                onClick={() => {
                  navigate('/custom');
                }}
              >
                Configurações
              </Button>
              <Button
                rightIcon={<FiLogOut />}
                variant="light"
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
