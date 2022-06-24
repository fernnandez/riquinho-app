import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { mantineTheme } from './utils/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ ...mantineTheme }}
      withNormalizeCSS
      withGlobalStyles
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
