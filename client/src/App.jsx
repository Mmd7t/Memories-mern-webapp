import React from "react";
import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./utils/theme";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/posts" />}
              />
              <Route exact path="/posts" element={<Home />} />
              <Route exact path="/posts/search" element={<Home />} />
              <Route exact path="/posts/:id" element={<PostDetails />} />
              <Route
                path="/auth"
                element={!user ? <Auth /> : <Navigate replace to="/" />}
              />
            </Routes>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
