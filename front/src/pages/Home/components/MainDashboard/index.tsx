import {
  Box,
  Button,
  Divider,
  Group,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { BiChart } from 'react-icons/bi';
import { BsGraphUp } from 'react-icons/bs';
import { GiMoneyStack, GiStairsGoal } from 'react-icons/gi';
import { useQuery } from 'react-query';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { findAllCategorias } from '../../../../services/categoria';
import { findAllTransacao } from '../../../../services/transacao';
import { Charts } from '../Charts';
import { InfoCards } from '../InfoCards';
import { Metas } from '../Metas';
import { CreateMetaModal } from '../Metas/MetaModals/CreateMetaModal';
import { SeletorMes } from '../SeletorMes';
import { TransacaoList } from '../TransacaoList';
import { CreateTransacaoModal } from '../TransacaoModals/CreateTransacaoModal';

export function MainDashboard() {
  const [openedCreate, handlersCreate] = useDisclosure(false);

  const { token } = useContext(AuthContext);

  const { data: dateCategorias } = useQuery(['categorias'], () => {
    return findAllCategorias(token.token);
  });

  const {
    data: transacoes,
    isLoading,
    error,
  } = useQuery(
    ['transacoes'],
    () => {
      return findAllTransacao(token.token);
    },
    {}
  );

  return (
    <Box
      style={{
        minWidth: '100%',
        padding: '1rem',
      }}
    >
      <Group
        style={{
          justifyContent: 'space-between',
          marginBottom: '2rem',
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

      <Divider mt="2rem" size="md" color="blue" />

      <Group align="center" mt="2rem">
        <Title order={2} align="center">
          Resumo
        </Title>
        <ThemeIcon size={30}>
          <BsGraphUp size={30} />
        </ThemeIcon>
      </Group>

      <InfoCards isLoading={isLoading} transacoes={transacoes?.data} />

      <Group align="center" mt="2rem">
        <Title order={2} align="center">
          Transações
        </Title>
        <ThemeIcon size={30}>
          <GiMoneyStack size={30} />
        </ThemeIcon>
      </Group>
      <TransacaoList
        categorias={dateCategorias?.data}
        transacoes={transacoes?.data}
        isLoading={isLoading}
      />

      <Group align="center" mt="2rem">
        <Title order={2} align="center">
          Dashboards
        </Title>
        <ThemeIcon size={30}>
          <BiChart size={30} />
        </ThemeIcon>
      </Group>
      <Charts transacoes={transacoes?.data} isLoading={isLoading} />

      {/* Modals */}
      {dateCategorias?.data && (
        <>
          <CreateTransacaoModal
            categorias={dateCategorias.data}
            isOpen={openedCreate}
            onClose={handlersCreate.close}
          />
        </>
      )}
      
    </Box>
  );
}
