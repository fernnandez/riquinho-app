import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  ColorInput,
  Grid,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useContext, useEffect, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import AuthContext from '../../../../../context/AuthContext/AuthContext';
import { useModalController } from '../../../../../context/ModalContext/ModalContext';
import {
  CategoriaResponse,
  updateCategoria,
} from '../../../../../services/categoria';
import { queryClient } from '../../../../../services/queryClient';
import { getSimpleIcon, iconList } from '../../../../../utils/constants';
import { SelectItemIcon } from '../../../../../utils/customSelect';
import { notify, TypeNotificationEnum } from '../../../../../utils/notify';

import { useStyles } from '../styles';

interface EditCategoriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoriaList: CategoriaResponse[];
}

export function EditCategoriaModal({
  isOpen,
  onClose,
  categoriaList,
}: EditCategoriaModalProps) {
  const { classes } = useStyles();
  const { token } = useContext(AuthContext);
  const [Loading, setloading] = useState(false);

  const { id } = useModalController();

  const form = useForm({
    initialValues: {
      nome: '',
      icon: 'CUSTOM',
      color: '#6b6b6b',
      isForReceita: true,
      isForDespesa: true,
    },
    validate: (values) => ({
      nome: values.nome === '' ? 'nome é obrigatório' : null,
    }),
  });

  useEffect(() => {
    const categoriaToEdit = categoriaList.find(
      (categoria) => categoria.id === id
    );

    if (categoriaToEdit) {
      form.setValues({
        nome: categoriaToEdit.nome,
        color: categoriaToEdit.color,
        icon: categoriaToEdit.icon,
        isForDespesa: categoriaToEdit.isForDespesa,
        isForReceita: categoriaToEdit.isForReceita,
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (data: typeof form.values) => {
    if (!data.isForDespesa && !data.isForReceita) {
      showNotification(
        notify({
          type: TypeNotificationEnum.ERROR,
          title: 'É preciso selecionar ao menos um tipo',
        })
      );
    } else {
      updateCategoria(id, data, token.token)
        .then(() => {
          queryClient.invalidateQueries('categorias').then(() => {
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
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      size="lg"
      padding="lg"
      centered
      title={
        <Box className={classes.formHeader}>
          <ActionIcon color="blue" variant="outline" size={40}>
            <BiCategory size={40} />
          </ActionIcon>
          <Title order={3}>Edição de Categoria</Title>
        </Box>
      }
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Grid grow gutter="xl" mt="md" mb="md">
          <Grid.Col span={6}>
            <TextInput
              label="Nome"
              placeholder="Nome"
              size="md"
              mb="md"
              maxLength={30}
              className={classes.textInput}
              {...form.getInputProps('nome')}
            />
            <Box>
              <Text>Tipo</Text>
              <Group mt="xs">
                <Checkbox
                  size="md"
                  label="Receita"
                  color="green"
                  checked={form.getInputProps('isForReceita').value}
                  {...form.getInputProps('isForReceita')}
                />
                <Checkbox
                  size="md"
                  label="Despesa"
                  color="red"
                  checked={form.getInputProps('isForDespesa').value}
                  {...form.getInputProps('isForDespesa')}
                />
              </Group>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <ColorInput
              placeholder="Cor do Icone"
              label="Cor do Icone"
              size="md"
              mb="md"
              {...form.getInputProps('color')}
            />
            {form.getInputProps('icon').value ? (
              <Box>
                <Text>Icone</Text>
                <Tooltip label="clique para mudar o icone">
                  <ThemeIcon
                    onClick={() => {
                      form.setFieldValue('icon', '');
                    }}
                    mt="xs"
                    radius={'md'}
                    size={35}
                    style={{
                      backgroundColor: form.getInputProps('color').value,
                    }}
                  >
                    {getSimpleIcon(
                      form.getInputProps('icon').value,
                      'white',
                      25
                    )}
                  </ThemeIcon>
                </Tooltip>
              </Box>
            ) : (
              <Select
                searchable
                placeholder="Icone"
                label="icone"
                size="md"
                data={iconList}
                itemComponent={SelectItemIcon}
                {...form.getInputProps('icon')}
              />
            )}
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
