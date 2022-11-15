import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  formHeader: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    cursor: 'default',
  },
  formButtonsRawEdit: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
  formButtonsEdit: { display: 'flex', gap: '2rem' },
  formButtonsCreate: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
    marginTop: '2rem',
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
  selectInput: {
    position: 'relative',
    '& .mantine-Select-error': {
      position: 'absolute',
      height: '10px',
      top: '4rem',
      fontSize: '0.8rem',
    },
  },
  datePicker: {
    position: 'relative',
    '& .mantine-DatePicker-error': {
      position: 'absolute',
      height: '10px',
      top: '4rem',
      fontSize: '0.8rem',
    },
  },
  numberInput: {
    position: 'relative',
    '& .mantine-NumberInput-error': {
      position: 'absolute',
      height: '10px',
      top: '4rem',
      fontSize: '0.8rem',
    },
  },
}));
