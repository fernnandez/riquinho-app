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
import { showNotification } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';
import { authCadastro } from '../../../../services/auth';
import { notify, TypeNotificationEnum } from '../../../../utils/notify';
import logo from '../../../../assets/logo.svg';
import { useStyles } from './styles';

export function CadastroForm() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
    },
    validate: (values) => ({
      nome: values.nome === '' ? 'nome é obrigatório' : null,
      email: values.email === '' ? 'email é obrigatório' : null,
      senha: values.senha === '' ? 'senha é obrigatória' : null,
    }),
  });

  const handleSubmit = (data: {
    nome: string;
    email: string;
    senha: string;
  }) => {
    authCadastro({ nome: data.nome, email: data.email, senha: data.senha })
      .then(() => {
        showNotification(notify({ type: TypeNotificationEnum.SUCCESS }));
        navigate('/login');
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

  return (
    <Paper className={classes.form} radius={0} p={30}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Center>
          <Image src={logo} width={200} height={50} mb="xl" />
        </Center>

        <TextInput
          className={classes.textInput}
          label="Nome"
          placeholder="seu nome"
          size="md"
          {...form.getInputProps('nome')}
        />

        <TextInput
          className={classes.textInput}
          label="Email"
          placeholder="hello@gmail.com"
          size="md"
          mt="md"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          className={classes.passwordInput}
          label="Senha"
          placeholder="sua senha"
          mt="md"
          size="md"
          {...form.getInputProps('senha')}
        />

        <Button fullWidth mt="xl" size="md" type="submit">
          Cadastrar
        </Button>

        <Text align="center" mt="md">
          Já tem uma conta?{' '}
          <Anchor component={Link} to="/login" weight={700}>
            Entre
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
}
