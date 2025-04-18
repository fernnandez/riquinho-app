import { useCallback, useState } from 'react';
import { authVerify } from '../../services/auth';
import storage from './storage';

export default function useStorage(key: any) {
  const [state, setState] = useState(() => storage.get(key));

  const set = useCallback(
    (newValue: any) => {
      storage.set(key, newValue);
      setState(newValue);
    },
    [key]
  );

  const remove = useCallback(() => {
    storage.remove(key);
    setState(undefined);
  }, [key]);

  return [state, set, remove];
}
