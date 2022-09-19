import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    background: 'blue',
    display: 'flex',
    width: '100%',
  },

  ilustration: {
    color: 'white',
    flex: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
