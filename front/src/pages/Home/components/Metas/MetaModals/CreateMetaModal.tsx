import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Modal,
  NumberInput,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useContext, useState } from 'react';
import { GiStairsGoal } from 'react-icons/gi';
import { MdAttachMoney } from 'react-icons/md';
import { TbCurlyLoop } from 'react-icons/tb';
import AuthContext from '../../../../../context/AuthContext/AuthContext';
import { createMeta } from '../../../../../services/meta';
import { queryClient } from '../../../../../services/queryClient';
import { notify, TypeNotificationEnum } from '../../../../../utils/notify';
import { useStyles } from './styles';

interface CreateMetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMetaModal({ isOpen, onClose }: CreateMetaModalProps) {
  const { classes } = useStyles();
  const [Loading, setloading] = useState(false);
  const { token } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      titulo: '',
      descricao: '',
      valor: '',
      prazo: '',
      dataInicio: new Date(),
    },
    validate: (values) => ({
      titulo: values.titulo === '' ? 'titulo é obrigatório' : null,
      valor: values.valor === '' ? 'valor é obrigatório' : null,
      prazo: values.prazo === '' ? 'prazo é obrigatório' : null,
      dataInicio:
        values.dataInicio === null ? 'data de inicio é obrigatória' : null,
    }),
  });

  const handleSubmit = async (data: typeof form.values) => {
    setloading(true);
    createMeta(
      {
        ...data,
      },
      token.token
    )
      .then(() => {
        queryClient.invalidateQueries('metas').then(() => {
          queryClient.invalidateQueries('transacoes').then(() => {
            showNotification(notify({ type: TypeNotificationEnum.SUCCESS }));
            handleClose();
          });
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

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={handleClose}
      padding="xl"
      size="lg"
      title={
        <Box className={classes.formHeader}>
          <ActionIcon color="blue" variant="outline" size={40}>
            <GiStairsGoal size={40} />
          </ActionIcon>
          <Title order={3}>Cadastro de Meta</Title>
        </Box>
      }
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Grid grow gutter="xl" mt=".5rem">
          <Grid.Col span={6}>
            <TextInput
              label="Titulo"
              placeholder="Titulo"
              size="md"
              mb="md"
              className={classes.textInput}
              {...form.getInputProps('titulo')}
            />
            <NumberInput
              icon={<MdAttachMoney size={18} />}
              className={classes.numberInput}
              size="md"
              label="Valor Total"
              mb="md"
              hideControls
              min={0}
              precision={2}
              decimalSeparator=","
              {...form.getInputProps('valor')}
            />
            <DatePicker
              placeholder="Data de Lançamento"
              label="Data de Lançamento"
              size="md"
              mb="25px"
              className={classes.datePicker}
              {...form.getInputProps('dataInicio')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              className={classes.textInput}
              label="Descrição"
              placeholder="Descrição"
              mb="md"
              size="md"
              {...form.getInputProps('descricao')}
            />
            <NumberInput
              className={classes.numberInput}
              size="md"
              label="Prazo (meses)"
              mb="md"
              hideControls
              min={0}
              precision={0}
              decimalSeparator=","
              {...form.getInputProps('prazo')}
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
