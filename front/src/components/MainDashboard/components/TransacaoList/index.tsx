import { Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { useModalController } from '../../../../context/ModalContext/ModalContext';
import { useMonthController } from '../../../../context/MonthContext/MonthContext';
import { CategoriaResponse } from '../../../../services/categoria';
import {
  TransacaoOneParcela,
  TransacaoResponse,
} from '../../../../services/transacao';
import { getTransacaoDate } from '../../formatter';
import { TipoTransacaoEnum } from '../TransacaoModals/constants';
import { EditTransacaoModal } from '../TransacaoModals/EditTransacaoModal';
import { TransacaoTable } from './TransacaoTable';

interface TransacaoListCustomProps {
  transacoes:
    | { receitas: TransacaoResponse[]; despesas: TransacaoResponse[] }
    | undefined;
  categorias: CategoriaResponse[] | undefined;
}

export function TransacaoList({
  categorias,
  transacoes,
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
        isLoading={false}
        data={receitas}
        error={null}
        handleOpenEditModal={handleOpenEditModal}
      />

      <TransacaoTable
        tipo={TipoTransacaoEnum.DESPESA}
        isLoading={false}
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
