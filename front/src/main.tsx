import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import AuthProvider from './context/AuthContext/AuthProvider';
import { queryClient } from './services/queryClient';
import { mantineTheme } from './utils/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <MantineProvider
        theme={{ ...mantineTheme }}
        withNormalizeCSS
        withGlobalStyles
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
