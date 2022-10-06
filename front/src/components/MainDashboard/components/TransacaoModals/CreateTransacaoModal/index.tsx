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
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useContext, useEffect, useState } from 'react';
import { MdAttachMoney } from 'react-icons/md';
import { TbCashBanknoteOff } from 'react-icons/tb';
import AuthContext from '../../../../../context/AuthContext/AuthContext';
import { CategoriaResponse } from '../../../../../services/categoria';
import { queryClient } from '../../../../../services/queryClient';
import { createTransacao } from '../../../../../services/transacao';

import { SelectItemIcon } from '../../../../../utils/customSelect';
import { notify, TypeNotificationEnum } from '../../../../../utils/notify';
import {
  getCategoriaSelectList,
  getStatus,
  getTipo,
  TipoSelectItems,
} from '../constants';
import { useStyles } from '../styles';
interface CreateTransacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  categorias: CategoriaResponse[];
}

export function CreateTransacaoModal({
  isOpen,
  onClose,
  categorias,
}: CreateTransacaoModalProps) {
  const { classes } = useStyles();
  const [Loading, setloading] = useState(false);
  const { token } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      titulo: '',
      valor: '',
      data: new Date(),
      categoria: '',
      tipo: 'RECEITA',
      descricao: '',
      status: 'EFETIVADA',
    },
    validate: (values) => ({
      titulo: values.titulo === '' ? 'titulo é obrigatório' : null,
      categoria: values.categoria === '' ? 'categoria é obrigatório' : null,
      valor: values.valor === '' ? 'valor é obrigatório' : null,
      data: values.data === null ? 'data é obrigatório' : null,
      tipo: values.tipo === null ? 'tipo é obrigatório' : null,
    }),
  });

  const handleSubmit = (data: typeof form.values) => {
    setloading(true);
    createTransacao(
      {
        ...data,
        valor: Number(data.valor),
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
      })
      .finally(() => setloading(false));
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  // Existem categorias difentes em cada tipo e isso garante que o form nao quebre
  useEffect(() => {
    form.setFieldValue('categoria', '');
  }, [form.getInputProps('tipo').value]);

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
              searchable
              className={classes.selectInput}
              size="md"
              mb="md"
              label="Categoria"
              placeholder="Categoria"
              itemComponent={SelectItemIcon}
              data={
                form.getInputProps('tipo').value === 'RECEITA'
                  ? getCategoriaSelectList(
                      categorias.filter((el) => el.isForReceita)
                    )
                  : getCategoriaSelectList(
                      categorias.filter((el) => el.isForDespesa)
                    )
              }
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
