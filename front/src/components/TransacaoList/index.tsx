import {
  Alert,
  Box,
  Button,
  Group,
  Loader,
  Paper,
  ScrollArea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import {
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai';
import { useQuery } from 'react-query';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useModalController } from '../../context/ModalContext/ModalContext';
import { useMonthController } from '../../context/MonthContext/MonthContext';
import { findAllTransacao, TransacaoResponse } from '../../services/transacao';
import { InfoCards } from '../InfoCards';
import { SeletorMes } from './components/SeletorMes';
import { TransacaoItem } from './components/TransacaoItem';
import { TipoTransacaoEnum } from './components/TransacaoModals/constants';
import { CreateTransacaoModal } from './components/TransacaoModals/CreateTransacaoModal';
import { EditTransacaoModal } from './components/TransacaoModals/EditTransacaoModal';
import { getTransacaoByTipo, getValues } from './formatter';

export function TransacaoList() {
  const [openedCreate, handlersCreate] = useDisclosure(false);
  const [openedEdit, handlersEdit] = useDisclosure(false);

  const { onSetId } = useModalController();
  const { date } = useMonthController();
  const { token } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery(['transacoes'], () => {
    return findAllTransacao(token.token);
  });

  const [receitas, setReceitas] = useState<TransacaoResponse[]>([]);
  const [despesas, setDespesas] = useState<TransacaoResponse[]>([]);

  const handleOpenEditModal = (id: string) => {
    onSetId(id);
    handlersEdit.open();
  };

  useEffect(() => {
    if (data) {
      setReceitas(
        getTransacaoByTipo(TipoTransacaoEnum.RECEITA, data.data, date)
      );
      setDespesas(
        getTransacaoByTipo(TipoTransacaoEnum.DESPESA, data.data, date)
      );
    } else {
      setReceitas([]);
      setDespesas([]);
    }
  }, [data, date]);

  return (
    <Box
      style={{
        minWidth: '100%',
      }}
    >
      <InfoCards
        isLoading={isLoading}
        values={
          data && data.data.length > 0 ? getValues(data.data, date) : null
        }
      />
      <Group
        style={{
          justifyContent: 'space-between',
          marginBottom: '2rem',
          marginTop: '2rem',
        }}
      >
        <Button
          color="blue"
          leftIcon={<AiOutlinePlus />}
          onClick={() => handlersCreate.open()}
        >
          Adicionar nova transação
        </Button>
        <SeletorMes />
        <TextInput
          icon={<AiOutlineSearch size={18} />}
          placeholder="Pesquisar"
          disabled
        />
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
          style={{ backgroundColor: '#D1f7d6', flex: 1 }}
          shadow="md"
          p="1rem"
        >
          <ScrollArea style={{ height: 500 }}>
            <>
              {isLoading && (
                <Box
                  style={{
                    height: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Loader />
                </Box>
              )}
              {!isLoading && error && (
                <Box
                  style={{
                    height: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Alert
                    icon={<AiOutlineInfoCircle size={20} />}
                    title="Ops!"
                    color="red"
                  >
                    Aparentemente alguma coisa deu errado, tente novamente
                  </Alert>
                </Box>
              )}

              {receitas && receitas.length > 0 && (
                <Group>
                  {receitas.map((transacao) => (
                    <TransacaoItem
                      key={transacao.id}
                      data={transacao}
                      onOpenEdit={handleOpenEditModal}
                    />
                  ))}
                </Group>
              )}
              {!isLoading && !error && receitas && receitas.length === 0 && (
                <Box
                  style={{
                    height: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Alert
                    icon={<AiOutlineInfoCircle size={20} />}
                    title="Ops!"
                    color="blue"
                  >
                    Nenhuma informação cadastradada
                  </Alert>
                </Box>
              )}
            </>
          </ScrollArea>
        </Paper>

        <Paper
          style={{ backgroundColor: '#Ffd3d3', flex: 1 }}
          shadow="md"
          p="1rem"
        >
          <ScrollArea style={{ height: 500 }}>
            <>
              {isLoading && (
                <Box
                  style={{
                    height: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Loader />
                </Box>
              )}
              {!isLoading && error && (
                <Box
                  style={{
                    height: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Alert
                    icon={<AiOutlinePlus size={20} />}
                    title="Ops!"
                    color="red"
                  >
                    Aparentemente alguma coisa deu errado, tente novamente
                  </Alert>
                </Box>
              )}

              {data && data.data.length > 0 && (
                <Group>
                  {despesas.map((transacao) => (
                    <TransacaoItem
                      key={transacao.id}
                      data={transacao}
                      onOpenEdit={handleOpenEditModal}
                    />
                  ))}
                </Group>
              )}
              {!isLoading && !error && despesas && despesas.length === 0 && (
                <Box
                  style={{
                    height: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Alert
                    icon={<AiOutlinePlus size={20} />}
                    title="Ops!"
                    color="blue"
                  >
                    Nenhuma informação cadastradada
                  </Alert>
                </Box>
              )}
            </>
          </ScrollArea>
        </Paper>
      </Box>
      <CreateTransacaoModal
        isOpen={openedCreate}
        onClose={handlersCreate.close}
      />
      {data && data.data.length > 0 && (
        <EditTransacaoModal
          isOpen={openedEdit}
          onClose={handlersEdit.close}
          transacaoList={data.data}
        />
      )}
    </Box>
  );
}
