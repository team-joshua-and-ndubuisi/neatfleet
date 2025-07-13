import { createTheme } from '@mui/material';
import { green, red } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    plus: Palette['primary'];
    minus: Palette['primary'];
  }

  interface PaletteOptions {
    plus?: PaletteOptions['primary'];
    minus?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    plus: true;
    minus: true;
  }
}

const theme = createTheme({
  palette: {
    plus: {
      light: green[300],
      main: green[700],
      dark: green[700],
    },
    minus: {
      light: red[300],
      main: red[700],
      dark: red[700],
    },
  },
});

export { theme };
