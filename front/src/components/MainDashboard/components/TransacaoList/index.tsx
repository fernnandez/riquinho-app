import { Alert, Box, Group, Loader, Paper, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai';
import { useQuery } from 'react-query';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { useModalController } from '../../../../context/ModalContext/ModalContext';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import {
  CategoriaResponse,
  findAllCategorias,
} from '../../../../services/categoria';
import {
  findAllTransacao,
  TransacaoResponse,
} from '../../../../services/transacao';
import { getTransacaoByTipo } from '../../formatter';
import { TransacaoItem } from './TransacaoItem';
import { TipoTransacaoEnum } from '../TransacaoModals/constants';
import { EditTransacaoModal } from '../TransacaoModals/EditTransacaoModal';

interface TransacaoListCustomProps {
  transacoes: TransacaoResponse[];
  categorias: CategoriaResponse[] | undefined;
  isLoading: boolean;
  error: unknown;
}

export function TransacaoList({
  categorias,
  error,
  isLoading,
  transacoes,
}: TransacaoListCustomProps) {
  const [openedEdit, handlersEdit] = useDisclosure(false);

  const { onSetId } = useModalController();
  const { date } = useMonthController();

  const [receitas, setReceitas] = useState<TransacaoResponse[]>([]);
  const [despesas, setDespesas] = useState<TransacaoResponse[]>([]);

  const handleOpenEditModal = (id: string) => {
    onSetId(id);
    handlersEdit.open();
  };

  useEffect(() => {
    if (transacoes) {
      setReceitas(
        getTransacaoByTipo(TipoTransacaoEnum.RECEITA, transacoes, date)
      );
      setDespesas(
        getTransacaoByTipo(TipoTransacaoEnum.DESPESA, transacoes, date)
      );
    } else {
      setReceitas([]);
      setDespesas([]);
    }
  }, [date, transacoes]);

  return (
    <Box
      style={{
        minWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2rem',
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

            {transacoes && transacoes.length > 0 && (
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
      {transacoes && transacoes.length > 0 && (
        <EditTransacaoModal
          categorias={categorias || []}
          isOpen={openedEdit}
          onClose={handlersEdit.close}
          transacaoList={transacoes}
        />
      )}
    </Box>
  );
}
