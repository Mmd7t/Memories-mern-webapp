import React from "react";
import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./utils/theme";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
