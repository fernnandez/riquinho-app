import { Box, Button, Grid, Modal, TextInput, Title } from '@mantine/core';

import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../../context/AuthContext/AuthContext';
import { queryClient } from '../../services/queryClient';
import { findOneUser, updateNome } from '../../services/user';
import { notify, TypeNotificationEnum } from '../../utils/notify';
import { useStyles } from './styles';

interface UpdateNomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  nome: string;
  id: string;
}

export function UpdateNomeModal({
  isOpen,
  onClose,
  nome,
  id,
}: UpdateNomeModalProps) {
  const [Loading, setloading] = useState(false);
  const { token } = useContext(AuthContext);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      nome: nome,
      senha: '',
    },
    validate: (values) => ({
      nome: values.nome === '' ? 'nome é obrigatório' : null,
      senha: values.senha === '' ? 'senha é obrigatória' : null,
    }),
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (data: typeof form.values) => {
    setloading(true);
    updateNome(
      id,
      {
        ...data,
      },
      token.token
    )
      .then(() => {
        queryClient.invalidateQueries('user').then(() => {
          showNotification(notify({ type: TypeNotificationEnum.SUCCESS }));
          handleClose();
        });
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
      })
      .finally(() => setloading(false));
  };

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={handleClose}
      padding="xl"
      size="lg"
      title={<Title order={3}>Atualização de Nome</Title>}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Grid grow gutter="xl" mt=".5rem">
          <Grid.Col span={12}>
            <TextInput
              label="Nome"
              placeholder="Nome"
              size="md"
              mb="md"
              className={classes.textInput}
              {...form.getInputProps('nome')}
            />
            <TextInput
              label="Senha"
              placeholder="Senha"
              size="md"
              mb="md"
              className={classes.textInput}
              {...form.getInputProps('senha')}
            />
          </Grid.Col>
        </Grid>
        <Box className={classes.formButtonsCreate}>
          <Button
            onClick={handleClose}
            color="red"
            size="md"
            variant="subtle"
            pl="xl"
            pr="xl"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="blue"
            size="md"
            pl="xl"
            pr="xl"
            loading={Loading}
          >
            Salvar
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
