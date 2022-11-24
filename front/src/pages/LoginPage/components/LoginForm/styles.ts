import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  form: {
    flex: 4,
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  textInput: {
    position: 'relative',
    '& .mantine-TextInput-error': {
      position: 'absolute',
      height: '10px',
      top: '4rem',
      fontSize: '0.8rem',
    },
  },
  passwordInput: {
    position: 'relative',
    '& .mantine-PasswordInput-error': {
      position: 'absolute',
      height: '10px',
      top: '4rem',
      fontSize: '0.8rem',
    },
  },
}));
