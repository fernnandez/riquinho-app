import logo from '../../assets/logo.svg';
import { useStyles } from './styles';
import {
  Anchor,
  Button,
  Center,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { authLogin } from '../../services/auth';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { showNotification } from '@mantine/notifications';
import { notify, TypeNotificationEnum } from '../../utils/notify';

export function LoginForm() {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      email: '',
      senha: '',
    },
  });

  const handleSubmit = (data: { email: string; senha: string }) => {
    authLogin({ email: data.email, password: data.senha })
      .then((result) => {
        setToken(result.data);
        navigate('/');
      })
      .catch((error: any) => {
        showNotification(notify({ type: TypeNotificationEnum.ERROR }));
      });
  };

  return (
    <Paper className={classes.form} radius={0} p={30}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Center>
          <Image src={logo} width={200} height={50} mb="xl" />
        </Center>

        <TextInput
          label="Email"
          placeholder="hello@gmail.com"
          size="md"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Senha"
          placeholder="sua senha"
          mt="md"
          size="md"
          {...form.getInputProps('senha')}
        />

        <Button fullWidth mt="xl" size="md" type="submit">
          Login
        </Button>

        <Text align="center" mt="md">
          Não tem uma conta?
          <Anchor component={Link} to="/cadastro" weight={700}>
            Cadastre-se
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
}
