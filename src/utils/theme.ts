import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true
};
const custom = {
  colors: {
    purple: {
      500: '#805AD5',
    }
  }
};
const theme = extendTheme({ config, custom });

export default theme;
