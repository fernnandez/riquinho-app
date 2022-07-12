import { Box, Image, Title } from '@mantine/core';
import cadastroIlustration from '../../assets/mobileInterface.svg';
import { CadastroForm } from '../../components/CadastroForm';
import { useStyles } from './styles';

export function CadastroPage() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <CadastroForm />
      <Box className={classes.ilustration}>
        <Title order={2} style={{ cursor: 'default' }}>
          Gerenciar seu dinheiro
        </Title>
        <Title order={1} style={{ cursor: 'default' }} mb="xl">
          É importante
        </Title>
        <Image src={cadastroIlustration} width={400} />
      </Box>
    </div>
  );
}
