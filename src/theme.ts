import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light'
};

const theme = extendTheme({
  config,
  components: {
    FormLabel: {
      baseStyle: {
        fontWeight: 'normal',
      },
    },
    Input: {
      baseStyle: {
        field: {
          '::placeholder': {
            fontWeight: 'normal', 
          },
        },
      },
    },
  },
});

export default theme;
