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
import logo from '../../assets/logo.svg';
import { useStyles } from './styles';

export function CadastroForm() {
  const { classes } = useStyles();

  return (
    <Paper className={classes.form} radius={0} p={30}>
      <form>
        <Center>
          <Image src={logo} width={200} height={50} mb="xl" />
        </Center>

        <TextInput label="Nome" placeholder="seu nome" size="md" />

        <TextInput
          label="Email"
          placeholder="hello@gmail.com"
          size="md"
          mt="md"
        />

        <PasswordInput
          label="Senha"
          placeholder="sua senha"
          mt="md"
          size="md"
        />

        <Button fullWidth mt="xl" size="md">
          Cadastrar
        </Button>

        <Text align="center" mt="md">
          Já tem uma conta?
          <Anchor<'a'>
            href="#"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Entre
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
}
