import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#009688',
    //   contrastText: '#795548',
    // },
    background: {
    //   default: 'rgb(242, 242, 242)',
      default: 'rgb(255, 255, 255)',
    },
    text: { primary: 'rgba(0,0,0,0.75)' },
  },
});

export default theme;