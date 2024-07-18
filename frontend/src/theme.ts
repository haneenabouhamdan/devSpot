import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    green: {
      500: '#63BAAB',
    },
    pink: {
      500: '#c01b4a',
      300: '#da426d',
    },
    purple: {
      500: '#542454',
      300: '#7b4e7b',
    },
    orange: {
      500: '#f4a261',
      300: '#f7ba8a',
    },
    blue: {
      500: '#1f79f6',
      300: '#60a0f9',
    },
    black: {
      500: '#000000',
    },
    white: {
      500: '#ffffff',
    },
    gray: {
      500: '#98a2b3',
      300: '#b7beca',
    },
  },
});

export default theme;
