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

export function LoginForm() {
  const { classes } = useStyles();

  return (
    <Paper className={classes.form} radius={0} p={30}>
      <form>
        <Center>
          <Image src={logo} width={200} height={50} mb="xl" />
        </Center>

        <TextInput label="Email" placeholder="hello@gmail.com" size="md" />

        <PasswordInput
          label="Senha"
          placeholder="sua senha"
          mt="md"
          size="md"
        />

        <Button fullWidth mt="xl" size="md">
          Login
        </Button>

        <Text align="center" mt="md">
          Não tem uma conta?
          <Anchor<'a'>
            href="#"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Cadastre-se
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
}
