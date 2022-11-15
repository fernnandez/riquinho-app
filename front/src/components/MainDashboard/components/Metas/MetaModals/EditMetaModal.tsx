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
import { useContext, useEffect, useState } from 'react';
import { MdAttachMoney } from 'react-icons/md';
import { TbCurlyLoop } from 'react-icons/tb';
import AuthContext from '../../../../../context/AuthContext/AuthContext';
import { useModalController } from '../../../../../context/ModalContext/ModalContext';
import { createMeta, Meta, updateMeta } from '../../../../../services/meta';
import { queryClient } from '../../../../../services/queryClient';
import { notify, TypeNotificationEnum } from '../../../../../utils/notify';
import { useStyles } from './styles';

interface EditMetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  metaList: Meta[];
}

export function EditMetaModal({
  isOpen,
  onClose,
  metaList,
}: EditMetaModalProps) {
  const { classes } = useStyles();
  const [Loading, setloading] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useModalController();

  const form = useForm({
    initialValues: {
      titulo: '',
      descricao: '',
      valor: 0,
      prazo: 0,
      dataInicio: new Date(),
    },
    validate: (values) => ({
      titulo: values.titulo === '' ? 'titulo é obrigatório' : null,
      valor: values.valor === 0 ? 'valor é obrigatório' : null,
      prazo: values.prazo === 0 ? 'prazo é obrigatório' : null,
      dataInicio:
        values.dataInicio === null ? 'data de inicio é obrigatória' : null,
    }),
  });

  const handleSubmit = async (data: typeof form.values) => {
    setloading(true);
    updateMeta(
      id,
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

  useEffect(() => {
    const metaToEdit = metaList.find((meta) => meta.id === id);

    if (metaToEdit) {
      form.setValues({
        titulo: metaToEdit.titulo,
        valor: +metaToEdit.valor,
        descricao: metaToEdit.descricao,
        prazo: metaToEdit.prazo,
        dataInicio: new Date(metaToEdit.dataInicio),
      });
    }
  }, [isOpen]);

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={handleClose}
      padding="xl"
      size="lg"
      title={
        <Box className={classes.formHeader}>
          <ActionIcon color="red" variant="outline" size={40}>
            <TbCurlyLoop size={40} />
          </ActionIcon>
          <Title order={3}>Edição de Meta</Title>
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
              placeholder="Data de Inicio"
              label="Data de Incio"
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
