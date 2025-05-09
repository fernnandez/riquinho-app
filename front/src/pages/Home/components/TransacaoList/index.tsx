import { Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useModalController } from '../../../../context/ModalContext/ModalContext';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import { CategoriaResponse } from '../../../../services/categoria';
import {
  TransacaoOneParcela,
  TransacaoResponse,
} from '../../../../services/transacao';
import { TipoTransacaoEnum } from '../../../../utils/constants';
import { getTransacaoDate } from '../MainDashboard/formatter';
import { EditTransacaoModal } from '../TransacaoModals/EditTransacaoModal';
import { TransacaoTable } from './TransacaoTable';

interface TransacaoListCustomProps {
  transacoes:
    | { receitas: TransacaoResponse[]; despesas: TransacaoResponse[] }
    | undefined;
  categorias: CategoriaResponse[] | undefined;
  isLoading: boolean;
}

export function TransacaoList({
  categorias,
  transacoes,
  isLoading,
}: TransacaoListCustomProps) {
  const [openedEdit, handlersEdit] = useDisclosure(false);

  const { onSetId } = useModalController();
  const { date } = useMonthController();

  const [receitas, setReceitas] = useState<TransacaoOneParcela[]>([]);
  const [despesas, setDespesas] = useState<TransacaoOneParcela[]>([]);

  useEffect(() => {
    if (transacoes) {
      setReceitas(getTransacaoDate(transacoes.receitas, date));
      setDespesas(getTransacaoDate(transacoes.despesas, date));
    } else {
      setReceitas([]);
      setDespesas([]);
    }
  }, [date, transacoes]);

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
      <TransacaoTable
        tipo={TipoTransacaoEnum.RECEITA}
        isLoading={isLoading}
        data={receitas}
        error={null}
        handleOpenEditModal={handleOpenEditModal}
      />

      <TransacaoTable
        tipo={TipoTransacaoEnum.DESPESA}
        isLoading={isLoading}
        data={despesas}
        error={null}
        handleOpenEditModal={handleOpenEditModal}
      />

      {transacoes && (
        <EditTransacaoModal
          categorias={categorias || []}
          isOpen={openedEdit}
          onClose={handlersEdit.close}
          transacaoList={[...receitas, ...despesas] || []}
        />
      )}
    </Box>
  );
}
