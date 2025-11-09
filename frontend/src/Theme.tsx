import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#189329",        // main primary
      dark: "#127a23",        // slightly darker variant
      light: "#1fc33c"        // optional lighter shade (optional but common)
    },
    secondary: {
      main: "#59df89",        // main secondary
      dark: "#41b66c",        // slightly darker variant
      light: "#ccf6cfff"        // optional lighter shade
    },
    error: {
      main: "#ff0000",        // pure red
    },
    success: {
      main: "#00c234ff",        // pure green
    },
    text: {
      primary: "#252525ff",     // dark gray text
      secondary: "#4f4f4f",   // slightly lighter gray (optional)
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    allVariants: {
      color: "#252525ff",       // dark gray for all text
    },
  },
});

export default theme;