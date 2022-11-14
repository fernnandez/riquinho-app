import {
  ActionIcon,
  Box,
  Button,
  Center,
  Grid,
  Modal,
  NumberInput,
  Paper,
  SegmentedControl,
  Select,
  Switch,
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
import { useModalController } from '../../../../../context/ModalContext/ModalContext';
import { CategoriaResponse } from '../../../../../services/categoria';
import { queryClient } from '../../../../../services/queryClient';
import {
  TransacaoOneParcela,
  TransacaoResponse,
  updateTransacao,
} from '../../../../../services/transacao';
import { SelectItemIcon } from '../../../../../utils/customSelect';
import { notify, TypeNotificationEnum } from '../../../../../utils/notify';
import {
  getStatus,
  getTipo,
  TipoSelectItems,
  getCategoriaSelectList,
} from '../constants';
import { useStyles } from '../styles';

interface EditTransacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  transacaoList: TransacaoOneParcela[];
  categorias: CategoriaResponse[];
}

export function EditTransacaoModal({
  isOpen,
  onClose,
  transacaoList,
  categorias,
}: EditTransacaoModalProps) {
  const { classes } = useStyles();
  const [Loading, setloading] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useModalController();

  const form = useForm({
    initialValues: {
      titulo: '',
      valor: 0,
      data: new Date(),
      categoria: '',
      tipo: 'RECEITA',
      status: false,
      descricao: '',
      parcelado: false,
      parcelas: 1,
    },
    validate: (values) => ({
      titulo: values.titulo === '' ? 'titulo é obrigatório' : null,
      categoria: values.categoria === '' ? 'categoria é obrigatório' : null,
      valor: values.valor === 0 ? 'valor é obrigatório' : null,
      data: values.data === null ? 'data é obrigatório' : null,
      tipo: values.tipo === null ? 'tipo é obrigatório' : null,
    }),
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (data: typeof form.values) => {
    setloading(true);
    updateTransacao(
      id,
      {
        ...data,
        parcelado: data.parcelas > 1,
        parcelas: data.parcelas,
        status: getStatus(data.status === true ? 'EFETIVADA' : 'PENDENTE'),
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

  useEffect(() => {
    const trancasaoToEdit = transacaoList.find(
      (transacao) => transacao.id === id
    );

    if (trancasaoToEdit) {
      form.setValues({
        categoria: trancasaoToEdit.categoria.id,
        data: new Date(trancasaoToEdit.parcela.data),
        descricao: trancasaoToEdit.descricao,
        status: trancasaoToEdit.parcela.status === 'EFETIVADA' ? true : false,
        tipo: trancasaoToEdit.tipo,
        titulo: trancasaoToEdit.titulo,
        valor: Number(trancasaoToEdit.valorTotal),
        parcelado: trancasaoToEdit.parcelado,
        parcelas: trancasaoToEdit.parcelas,
      });
    }
  }, [isOpen]);

  // Existem categorias difentes em cada tipo e isso garante que o form nao quebre
  useEffect(() => {
    form.setFieldValue('categoria', '');
  }, [form.getInputProps('tipo').value]);

  useEffect(() => {
    form.setFieldValue('parcelas', 1);
  }, [form.getInputProps('parcelado').value]);

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
            <Title order={3}>Edição de</Title>
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
            <NumberInput
              icon={<MdAttachMoney size={18} />}
              className={classes.numberInput}
              size="md"
              label="Parcelas"
              mb="md"
              mt="md"
              hideControls
              min={0}
              precision={0}
              disabled={!form.getInputProps('parcelado').value}
              {...form.getInputProps('parcelas')}
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
            <Switch
              className={classes.textInput}
              label="Parcelado"
              size="md"
              mt="4rem"
              checked={form.getInputProps('parcelado').value}
              {...form.getInputProps('parcelado')}
            />
            <NumberInput
              icon={<MdAttachMoney size={18} />}
              className={classes.numberInput}
              size="md"
              label="Valor Parcela"
              mb="md"
              mt="2rem"
              hideControls
              min={0}
              precision={2}
              disabled={true}
              value={
                form.getInputProps('valor').value /
                form.getInputProps('parcelas').value
              }
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
