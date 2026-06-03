import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Navbar from "../stage2/src/components/Navbar";
import Notifications from "../stage2/src/pages/Notifications";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Notifications />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
