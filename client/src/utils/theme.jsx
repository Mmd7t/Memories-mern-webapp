import { createTheme } from "@mui/material/styles";
import { pink, indigo, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    },
    secondary: {
      main: pink[500],
    },

    background: {
      default: "#FDFDFF",
    },
    error: red,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: 5,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
  },
});
export default theme;
