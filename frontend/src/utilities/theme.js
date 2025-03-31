import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5e3960",
    },
    secondary: {
      main: "#474973",
    },
    tertiary: {
      main: "#A69CAC",
    },
    fourth: {
      main: "#F1DAC4",
    },
    background: {
      default: "#0D0C1D",
    },
    backgroundSecondary: {
      main: "#161B33",
    },
    text: {
      primary: "#ff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: "#ff", 
    },
    body1: {
      color: "#fff",
    },
  },
});

export default theme;
