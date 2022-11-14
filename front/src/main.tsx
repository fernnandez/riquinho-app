import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import App from './App';
import AuthProvider from './context/AuthContext/AuthProvider';
import { queryClient } from './services/queryClient';
import { mantineTheme } from './utils/theme';
import { ReactQueryDevtools } from 'react-query/devtools'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{ ...mantineTheme }}
        withNormalizeCSS
        withGlobalStyles
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </MantineProvider>
    {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
