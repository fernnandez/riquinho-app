import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 0, staleTime: 0 } },
});

export { queryClient };
