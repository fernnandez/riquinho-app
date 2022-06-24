import { Modal } from '@mantine/core';

interface CreateTransacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTransacaoModal({
  isOpen,
  onClose,
}: CreateTransacaoModalProps) {
  return (
    <Modal
      centered
      opened={isOpen}
      onClose={() => onClose()}
      title="Cadastrar nova receita"
    >
      {/* Modal content */}
    </Modal>
  );
}
