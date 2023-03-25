import React, { useState } from "react";
import { Container, Paper, Typography, Box, Grid, Button } from "@mui/material";
import { FcLock, FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { AUTH } from "../../utils/constants";
import { signup, signin } from "../../actions/auth.js";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      console.log("Signnnnnnnnnnnnnnnnnnnnn uppppp");
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const token = tokenResponse.access_token;
      const result = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data);

      console.log(result);
      try {
        dispatch({
          type: AUTH,
          data: { result, token },
        });
        console.log("a7aaaaaaaaaaaaaaaaaaaaaaaaaa");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Container maxWidth="sm" component="main">
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Box textAlign="center">
          <FcLock size={50} />
        </Box>
        <Typography
          variant="h6"
          textAlign="center"
          color="initial"
          sx={{ mb: 3 }}
        >
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form method="post" onSubmit={handleFormSubmit}>
          <Grid container spacing={1}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleOnChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleOnChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleOnChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleOnChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={() => setShowPassword(!showPassword)}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleOnChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={() => setShowPassword(!showPassword)}
              />
            )}
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ p: 1, mt: 4 }}
              >
                {isSignup ? "Sign up" : "Sign in"}
              </Button>
              <Button
                color="inherit"
                variant="text"
                fullWidth
                disableRipple={true}
                sx={{ my: 1 }}
                onClick={() => {
                  setIsSignup(!isSignup);
                }}
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
              <Box textAlign="center">
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: "none" }}
                  startIcon={<FcGoogle />}
                  onClick={googleLogin}
                >
                  Sign in with Google
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
