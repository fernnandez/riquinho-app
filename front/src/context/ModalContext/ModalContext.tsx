import { ModalsProvider } from '@mantine/modals';
import { useState, ReactNode, useContext } from 'react';

import { createContext } from 'react';

interface ModalProviderProps {
  children: ReactNode;
}

export interface UseModalContextData {
  onSetId: (value: string) => void;
  id: string;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [id, setId] = useState('');

  function onSetId(value: string) {
    setId(value);
  }

  const values = {
    id,
    onSetId,
  };

  return (
    <ModalsProvider>
      <UseModalContext.Provider value={values}>
        {children}
      </UseModalContext.Provider>
    </ModalsProvider>
  );
}

const UseModalContext = createContext<UseModalContextData>(
  {} as UseModalContextData
);

export function useModalController() {
  const context = useContext(UseModalContext);
  return context;
}
