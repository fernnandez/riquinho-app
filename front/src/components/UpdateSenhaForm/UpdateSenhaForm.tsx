import {
  Box,
  Button,
  Grid,
  Modal,
  TextInput,
  Title,
  PasswordInput,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import AuthContext from "../../context/AuthContext/AuthContext";
import { queryClient } from "../../services/queryClient";
import { findOneUser, updateNome, updateSenha } from "../../services/user";
import { notify, TypeNotificationEnum } from "../../utils/notify";
import { useStyles } from "./styles";

interface UpdateSenhaModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export function UpdateSenhaModal({
  isOpen,
  onClose,
  id,
}: UpdateSenhaModalProps) {
  const [Loading, setloading] = useState(false);
  const { token } = useContext(AuthContext);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      senha: "",
      lastSenha: "",
    },
    validate: (values) => ({
      lastSenha:
        values.lastSenha === "" ? "A senha antiga é obrigatória" : null,
      senha: values.senha === "" ? "Nova senha é obrigatória" : null,
    }),
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (data: typeof form.values) => {
    setloading(true);
    updateSenha(
      id,
      {
        ...data,
      },
      token.token
    )
      .then(() => {
        queryClient.invalidateQueries("user").then(() => {
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

            <PasswordInput
              label="Senha Antiga"
              placeholder="Senha Antiga"
              size="md"
              mb="md"
          
              {...form.getInputProps("lastSenha")}
            />
            <PasswordInput
              label="NovaSenha"
              placeholder="Senha Nova"
              size="md"
              mb="md"
          
              {...form.getInputProps("senha")}
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
