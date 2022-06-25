import {
  Alert,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  ScrollArea,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useQuery } from 'react-query';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useModalController } from '../../context/ModalContext/ModalContext';
import { findAllTransacao } from '../../services/transacao';
import { InfoCards } from '../InfoCards';
import { TransacaoItem } from './components/TransacaoItem';
import { CreateTransacaoModal } from './components/TransacaoModals/CreateTransacaoModal';
import { EditTransacaoModal } from './components/TransacaoModals/EditTransacaoModal';

export function TransacaoList() {
  const [openedCreate, handlersCreate] = useDisclosure(false);
  const [openedEdit, handlersEdit] = useDisclosure(false);
  const { onSetId } = useModalController();
  const { token } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery(['transacoes'], () => {
    return findAllTransacao(token.token);
  });

  const handleOpenEditModal = (id: string) => {
    onSetId(id);
    handlersEdit.open();
  };

  return (
    <Box
      style={{
        minWidth: '100%',
      }}
    >
      <InfoCards />
      <Group
        style={{
          justifyContent: 'space-between',
          marginBottom: '2rem',
          marginTop: '2rem',
        }}
      >
        <Title>Historico</Title>
        <Group>
          <Button
            color="blue"
            leftIcon={<AiOutlinePlus />}
            size="sm"
            onClick={() => handlersCreate.open()}
          >
            Adicionar
          </Button>
          <TextInput
            icon={<AiOutlineSearch size={18} />}
            placeholder="Pesquisar"
          />
        </Group>
      </Group>
      <Box
        style={{
          minWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        <Paper
          style={{ backgroundColor: '#bfefbb', flex: 1 }}
          shadow="md"
          p="1rem"
        >
          <ScrollArea style={{ height: 500 }}>
            <>
              {isLoading && (
                <Center>
                  <Loader />
                </Center>
              )}
              {!isLoading && error && (
                <Center>
                  <Alert
                    icon={<AiOutlinePlus size={20} />}
                    title="Ops!"
                    color="red"
                  >
                    Aparentemente alguma coisa deu errado, tente novamente
                  </Alert>
                </Center>
              )}

              {data && data.data.length > 0 && (
                <Group>
                  {data.data.map((transacao) => (
                    <TransacaoItem
                      data={transacao}
                      onOpenEdit={handleOpenEditModal}
                    />
                  ))}
                </Group>
              )}
              {data && data.data.length === 0 && (
                <Center>
                  <Alert
                    icon={<AiOutlinePlus size={20} />}
                    title="Ops!"
                    color="blue"
                  >
                    Nenhuma informação cadastradada
                  </Alert>
                </Center>
              )}
            </>
          </ScrollArea>
        </Paper>

        <Paper
          style={{ backgroundColor: '#ff9d95', flex: 1 }}
          shadow="md"
          p="1rem"
        >
          <ScrollArea style={{ height: 500 }}>
            <>
              {isLoading && (
                <Center>
                  <Loader />
                </Center>
              )}
              {!isLoading && error && (
                <Center>
                  <Alert
                    icon={<AiOutlinePlus size={20} />}
                    title="Ops!"
                    color="red"
                  >
                    Aparentemente alguma coisa deu errado, tente novamente
                  </Alert>
                </Center>
              )}

              {data && data.data.length > 0 && (
                <Center>
                  <Alert
                    icon={<AiOutlinePlus size={20} />}
                    title="Ops!"
                    color="blue"
                  >
                    Temos dados
                  </Alert>
                </Center>
              )}
              {data && data.data.length === 0 && (
                <Center>
                  <Alert
                    icon={<AiOutlinePlus size={20} />}
                    title="Ops!"
                    color="blue"
                  >
                    Nenhuma informação cadastradada
                  </Alert>
                </Center>
              )}
            </>
          </ScrollArea>
        </Paper>
      </Box>
      <CreateTransacaoModal
        isOpen={openedCreate}
        onClose={handlersCreate.close}
      />
      <EditTransacaoModal isOpen={openedEdit} onClose={handlersEdit.close} />
    </Box>
  );
}
