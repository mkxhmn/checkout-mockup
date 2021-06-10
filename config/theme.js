import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: red[700],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fafafa',
    },
  },
});

export default theme;
