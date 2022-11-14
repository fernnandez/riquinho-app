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
import { GiMoneyStack } from 'react-icons/gi';
import { useQuery } from 'react-query';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useMonthController } from '../../context/MonthContext/MonthContext';
import { findAllCategorias } from '../../services/categoria';
import { findAllTransacao } from '../../services/transacao';
import { Charts } from './components/Charts';
import { InfoCards } from './components/InfoCards';
import { SeletorMes } from './components/SeletorMes';
import { TransacaoList } from './components/TransacaoList';
import { TipoTransacaoEnum } from './components/TransacaoModals/constants';
import { CreateTransacaoModal } from './components/TransacaoModals/CreateTransacaoModal';

export function MainDashboard() {
  const [openedCreate, handlersCreate] = useDisclosure(false);

  const { token } = useContext(AuthContext);

  const { data: dateCategorias } = useQuery(['categorias'], () => {
    return findAllCategorias(token.token);
  });

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
      <InfoCards />

      <Group align="center" mt="2rem">
        <Title order={2} align="center">
          Transações
        </Title>
        <ThemeIcon size={30}>
          <GiMoneyStack size={30} />
        </ThemeIcon>
      </Group>
      <TransacaoList
        // isLoading={isLoading}
        // error={error}
        // transacoes={data?.data || []}
        categorias={dateCategorias?.data || []}
      />

      <Group align="center" mt="2rem">
        <Title order={2} align="center">
          Dashboards
        </Title>
        <ThemeIcon size={30}>
          <BiChart size={30} />
        </ThemeIcon>
      </Group>
      {/* {data && data.data.length > 0 && <Charts transacoes={data?.data} />} */}

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
