import {
  Box,
  Button,
  Group,
  Paper,
  ScrollArea,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useModalController } from '../../context/ModalContext/ModalContext';
import { InfoCards } from '../InfoCards';
import { CreateTransacaoModal } from './components/CreateTransacaoModal';
import { EditTransacaoModal } from './components/EditTransacaoModal';
import { TransacaoItem } from './components/TransacaoItem';

export function TransacaoList() {
  const [openedCreate, handlersCreate] = useDisclosure(false);
  const [openedEdit, handlersEdit] = useDisclosure(false);

  const { onSetId } = useModalController();

  const handleOpenEditModal = (id: string) => {
    console.log('openEdit');
    onSetId(id);
    handlersEdit.open();
  };

  return (
    <Box>
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
          width: '100%',
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
            <Group>
              <TransacaoItem
                text="Compras no mercado"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem text="Uber" onOpenEdit={handleOpenEditModal} />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
            </Group>
          </ScrollArea>
        </Paper>
        <Paper
          style={{ backgroundColor: '#ff9d95', flex: 1 }}
          shadow="md"
          p="1rem"
        >
          <ScrollArea style={{ height: 500 }}>
            <Group>
              <TransacaoItem
                text="Compras no mercado"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem text="Uber" onOpenEdit={handleOpenEditModal} />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
              <TransacaoItem
                text="Ida ao cinema"
                onOpenEdit={handleOpenEditModal}
              />
            </Group>
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
