import { Box, Image, Title } from '@mantine/core';
import loginIlustration from '../../assets/login-ilustration.svg';
import { LoginForm } from '../../components/LoginForm';
import { useStyles } from './styles';

export function LoginPage() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <LoginForm />
      <Box className={classes.ilustration}>
        <Title order={2} style={{ cursor: 'default' }}>
          Sua plataforma de
        </Title>
        <Title order={1} style={{ cursor: 'default' }} mb="xl">
          Gestão financeira
        </Title>
        <Image src={loginIlustration} />
      </Box>
    </div>
  );
}
