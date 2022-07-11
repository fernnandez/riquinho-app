import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Modal,
  NumberInput,
  SegmentedControl,
  Select,
  TextInput,
  Title
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useContext } from 'react';
import { MdAttachMoney } from 'react-icons/md';
import { TbCashBanknoteOff } from 'react-icons/tb';
import AuthContext from '../../../../../context/AuthContext/AuthContext';
import { queryClient } from '../../../../../services/queryClient';
import { createTransacao } from '../../../../../services/transacao';

import { SelectItemIcon } from '../../../../../utils/customSelect';
import { notify, TypeNotificationEnum } from '../../../../../utils/notify';
import {
  CategoriaSelectItems,
  getCategoria,
  getStatus,
  getTipo,
  TipoSelectItems
} from '../constants';
import { useStyles } from '../styles';
interface CreateTransacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTransacaoModal({
  isOpen,
  onClose,
}: CreateTransacaoModalProps) {
  const { classes } = useStyles();
  const { token } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      titulo: '',
      valor: 0,
      data: new Date(),
      categoria: '',
      tipo: 'RECEITA',
      descricao: '',
      status: 'EFETIVADA',
    },
    validate: (values) => ({
      titulo: values.titulo === '' ? 'titulo é obrigatório' : null,
      categoria: values.categoria === '' ? 'categoria é obrigatório' : null,
      valor: values.valor === 0 ? 'valor é obrigatório' : null,
      data: values.data === null ? 'data é obrigatório' : null,
      tipo: values.tipo === null ? 'tipo é obrigatório' : null,
    }),
  });

  const handleSubmit = (data: typeof form.values) => {
    createTransacao(
      {
        ...data,
        categoria: getCategoria(data.categoria),
        status: getStatus(data.status),
        tipo: getTipo(data.tipo),
      },
      token.token
    )
      .then(() => {
        queryClient.invalidateQueries('transacoes').then(() => {
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
      });
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
        form.getInputProps('tipo').value === 'RECEITA' ? (
          <Box className={classes.formHeader}>
            <ActionIcon color="green" variant="outline" size={40}>
              <MdAttachMoney size={40} />
            </ActionIcon>
            <Title order={3}>Cadastro de</Title>
            <SegmentedControl
              fullWidth
              data={TipoSelectItems}
              color={
                form.getInputProps('tipo').value === 'RECEITA' ? 'green' : 'red'
              }
              {...form.getInputProps('tipo')}
            />
          </Box>
        ) : (
          <Box className={classes.formHeader}>
            <ActionIcon color="red" variant="outline" size={40}>
              <TbCashBanknoteOff size={40} />
            </ActionIcon>
            <Title order={3}>Cadastro de</Title>
            <SegmentedControl
              fullWidth
              data={TipoSelectItems}
              color={
                form.getInputProps('tipo').value === 'RECEITA' ? 'green' : 'red'
              }
              {...form.getInputProps('tipo')}
            />
          </Box>
        )
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
              label="Valor"
              mb="md"
              hideControls
              min={0}
              precision={2}
              decimalSeparator=","
              {...form.getInputProps('valor')}
            />
            <TextInput
              className={classes.textInput}
              label="Descrição"
              placeholder="Descrição"
              size="md"
              {...form.getInputProps('descricao')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              className={classes.selectInput}
              size="md"
              mb="md"
              label="Categoria"
              placeholder="Categoria"
              itemComponent={SelectItemIcon}
              data={CategoriaSelectItems}
              {...form.getInputProps('categoria')}
            />
            <DatePicker
              placeholder="Data"
              label="Data"
              size="md"
              mb="25px"
              className={classes.datePicker}
              {...form.getInputProps('data')}
            />
            <Select
              className={classes.selectInput}
              size="md"
              mb="md"
              label="Status"
              placeholder="Status"
              data={[
                { label: 'Efetivada', value: 'EFETIVADA' },
                { label: 'Pendente', value: 'PENDENTE' },
              ]}
              {...form.getInputProps('status')}
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
          <Button type="submit" color="blue" size="md" pl="xl" pr="xl">
            Salvar
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
