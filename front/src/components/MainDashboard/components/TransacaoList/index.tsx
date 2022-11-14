import { Alert, Box, Group, Loader, Paper, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai';
import { useQuery } from 'react-query';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { useModalController } from '../../../../context/ModalContext/ModalContext';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import { CategoriaResponse } from '../../../../services/categoria';
import { findAllTransacao } from '../../../../services/transacao';
import { TipoTransacaoEnum } from '../TransacaoModals/constants';
import { EditTransacaoModal } from '../TransacaoModals/EditTransacaoModal';
import { TransacaoItem } from './TransacaoItem';

interface TransacaoListCustomProps {
  categorias: CategoriaResponse[] | undefined;
}

export function TransacaoList({ categorias }: TransacaoListCustomProps) {
  const [openedEdit, handlersEdit] = useDisclosure(false);
  const { token } = useContext(AuthContext);

  const { onSetId } = useModalController();
  const { date } = useMonthController();

  const {
    data: receitas,
    isLoading: isLoadingReceita,
    error: errorReceita,
  } = useQuery(['receitas'], () => {
    return findAllTransacao(
      token.token,
      TipoTransacaoEnum.RECEITA,
      date.toJSDate()
    );
  });

  const {
    data: despesas,
    isLoading: isLoadingDespesa,
    error: errorDespesa,
  } = useQuery(['despesas'], () => {
    return findAllTransacao(
      token.token,
      TipoTransacaoEnum.DESPESA,
      date.toJSDate()
    );
  });

  const handleOpenEditModal = (id: string) => {
    onSetId(id);
    handlersEdit.open();
  };

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
            {isLoadingReceita && (
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
            {!isLoadingReceita && errorReceita && (
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

            {receitas && receitas.data.length > 0 && (
              <Group>
                {receitas.data.map((transacao) => (
                  <TransacaoItem
                    key={transacao.id}
                    data={transacao}
                    onOpenEdit={handleOpenEditModal}
                  />
                ))}
              </Group>
            )}
            {!isLoadingReceita &&
              !errorReceita &&
              receitas &&
              receitas.data.length === 0 && (
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
            {isLoadingDespesa && (
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
            {!isLoadingDespesa && errorDespesa && (
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

            {despesas && despesas.data.length > 0 && (
              <Group>
                {despesas.data.map((transacao) => (
                  <TransacaoItem
                    key={transacao.id}
                    data={transacao}
                    onOpenEdit={handleOpenEditModal}
                  />
                ))}
              </Group>
            )}
            {!isLoadingDespesa &&
              !errorDespesa &&
              despesas &&
              despesas.data.length === 0 && (
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

      {receitas && despesas && (
        <EditTransacaoModal
          categorias={categorias || []}
          isOpen={openedEdit}
          onClose={handlersEdit.close}
          transacaoList={[...receitas.data, ...despesas.data] || []}
        />
      )}
    </Box>
  );
}
