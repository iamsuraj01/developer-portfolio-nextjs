import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeContextProvider from "../contexts/theme-context";
import "../styles/globals.css";

// Create a MUI theme (customize as needed)
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8, // Default spacing unit
});

const App = ({ Component, pageProps }) => {
  return (
    <ThemeContextProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StylesProvider>
    </ThemeContextProvider>
  );
};

export default App;
