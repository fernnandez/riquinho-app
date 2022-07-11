import { DateTime } from 'luxon';
import { ReactNode, useContext, useState } from 'react';

import { createContext } from 'react';

interface MonthProviderProps {
  children: ReactNode;
}

export interface UseMonthContextData {
  onSetDate: (value: DateTime) => void;
  date: DateTime;
}

export function MonthProvider({ children }: MonthProviderProps) {
  const [date, setDate] = useState(DateTime.now());

  function onSetDate(value: DateTime) {
    setDate(value);
  }

  const values = {
    date,
    onSetDate,
  };

  return (
    <UseMonthContext.Provider value={values}>
      {children}
    </UseMonthContext.Provider>
  );
}

const UseMonthContext = createContext<UseMonthContextData>(
  {} as UseMonthContextData
);

export function useMonthController() {
  const context = useContext(UseMonthContext);
  return context;
}
