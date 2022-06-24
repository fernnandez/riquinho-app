import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap:'1rem'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: '1rem',
    justifyContent: 'end',
  },
  information: {
    marginLeft: '.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
}));
