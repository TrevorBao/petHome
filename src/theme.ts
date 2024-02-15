import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light'
};

const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
  "3xl": "116em",
};

const fontSizes = {
  xs: '0.625rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
};

const theme = extendTheme({
  config,
  breakpoints,
  fontSizes,
  styles: {
    global: {
      'html, body': {
        fontSize: fontSizes.md, 
      },
      [`@media screen and (max-width: ${breakpoints['sm']})`]: {
        'html, body': {
          fontSize: fontSizes.xs, 
        },
      },
    },
  },
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
    Link: {
      baseStyle: ({
        fontSize: {
          base: fontSizes.sm, 
          xl: fontSizes.md,
          "3xl": fontSizes.lg,
        }, 
      }),
    },
    Text: {
      baseStyle: ({
        fontSize: fontSizes.md, 
      }),
    },
  },
});


export default theme;
