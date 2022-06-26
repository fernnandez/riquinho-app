import { MantineThemeOverride } from '@mantine/core';
import 'dayjs/locale/pt-br';

export const mantineTheme: MantineThemeOverride = {
  fontFamily: 'Poppins, sans serif',
  spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
  black: '#3d414C',
  breakpoints: {
    md: 1080,
    lg: 1280,
    xl: 1380,
  },
  datesLocale: 'pt-br',
  dateFormat: 'DD/MM/YYYY',
  loader: 'dots',
};

export const globalStyle = {};
