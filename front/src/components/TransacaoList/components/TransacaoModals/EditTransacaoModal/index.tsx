import { Modal } from '@mantine/core';

interface EditTransacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditTransacaoModal({
  isOpen,
  onClose,
}: EditTransacaoModalProps) {
  return (
    <Modal
      centered
      opened={isOpen}
      onClose={() => onClose()}
      title="Editar receita"
    >
      {/* Modal content */}
    </Modal>
  );
}
