import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '100%',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },

  container: {
    display: 'flex',
    overflowY: 'auto',
    minHeight: 'calc(100vh - 110px)',
    width: '100%',
    boxSizing: 'border-box',

    '::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: theme.colors.gray[0],
    },

    '::-webkit-scrollbar-thumb': {
      background: '#555',
      borderRadius: '10px',
    },

    '::-webkit-scrollbar-track': {
      background: ' #C9C9C9',
      borderRadius: '10px',
    },
  },
}));
