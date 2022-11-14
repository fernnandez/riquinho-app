import {
  Alert,
  Box,
  Loader,
  Paper,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { TransacaoOneParcela } from '../../../../../services/transacao';
import { TipoTransacaoEnum } from '../../TransacaoModals/constants';
import { TransacaoItem } from '../TransacaoItem';

interface TransacaoTableProp {
  tipo: TipoTransacaoEnum;
  isLoading: boolean;
  error: unknown;
  data: TransacaoOneParcela[] | undefined;
  handleOpenEditModal: (id: string) => void;
}

export function TransacaoTable({
  tipo,
  isLoading,
  error,
  data,
  handleOpenEditModal,
}: TransacaoTableProp) {
  return (
    <Paper
      style={{
        backgroundColor:
          tipo === TipoTransacaoEnum.RECEITA ? '#D1f7d6' : '#Ffd3d3',
        flex: 1,
      }}
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

          {data && data.length > 0 && (
            <Table verticalSpacing="xs" fontSize="md">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <Text size="sm">nome</Text>
                  </th>
                  <th>
                    <Text size="sm">valor</Text>
                  </th>
                  <th>
                    <Text size="sm">data</Text>
                  </th>
                  <th>
                    <Text size="sm">parcelado</Text>
                  </th>
                  <th>
                    <Text size="sm">ações</Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((transacao) => (
                  <TransacaoItem
                    key={transacao.id}
                    data={transacao}
                    onOpenEdit={handleOpenEditModal}
                  />
                ))}
              </tbody>
            </Table>
          )}
          {!isLoading && !error && data && data.length === 0 && (
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
  );
}
