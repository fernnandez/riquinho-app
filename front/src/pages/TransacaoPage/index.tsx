import {
  AppShell,
  Button,
  Container,
  Group,
  Header,
  Image,
} from '@mantine/core';
import { useStyles } from './styles';
import logo from '../../assets/logo.svg';
import { HeroText } from './test';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { TransacaoList } from '../../components/TransacaoList';

export function TransacaoPage() {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { token, remove } = useContext(AuthContext);

  const handleLogout = () => {
    remove();
    navigate('/login');
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);
  return (
    <AppShell
      header={
        <Header height={60}>
          <Container className={classes.header}>
            <Image src={logo} width={200} height={50} />
            <Group spacing={5} className={classes.links}>
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
      <section className={classes.container}>
        <TransacaoList />
      </section>
    </AppShell>
  );
}
