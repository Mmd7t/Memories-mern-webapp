import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import { LOGOUT } from "../../utils/constants";
import { MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import { pink } from "@mui/material/colors";
import decode from "jwt-decode";

const Navbar = () => {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.result.token;
    console.log(`toooken ${token}`);
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        googleLogout();
        dispatch({ type: LOGOUT });
        setUser(null);
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{ borderRadius: 3, m: "10px 0" }}
      enableColorOnDark
    >
      <Toolbar>
        <IconButton size="large" aria-label="dark mode" color="secondary">
          <MdOutlineDarkMode />
        </IconButton>
        <Typography
          variant="h6"
          color="primary"
          fontWeight={700}
          component={Link}
          to="/"
          sx={{ textDecoration: "none", ml: 2 }}
        >
          Memories
        </Typography>
        <Box sx={{ ml: "auto" }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="center"
            wrap="nowrap"
          >
            {user?.result && (
              <>
                <Grid item>
                  <Avatar
                    sx={{ width: 36, height: 36, bgcolor: pink[500] }}
                    src={user?.userInfo?.picture}
                  >
                    {user?.result.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="primary"
                    component="span"
                    fontWeight={700}
                    sx={{ textDecoration: "none", mr: 1 }}
                  >
                    {user?.result.name}
                  </Typography>
                </Grid>
              </>
            )}

            <Grid item>
              {user ? (
                <Button
                  variant="outlined"
                  size="large"
                  aria-label="dark mode"
                  color="secondary"
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    googleLogout();
                    dispatch({ type: LOGOUT });
                    setUser(null);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  aria-label="dark mode"
                  color="primary"
                  component={Link}
                  sx={{ textTransform: "none" }}
                  to="/auth"
                >
                  Login
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
