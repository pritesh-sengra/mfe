import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Layout from "../layout/layout";
import loginStyles from "./loginStyles";
import StickyFooter from "../../../../container/src/components/Footer";

export default function Login() {
  const classes = loginStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateText = (value) => {
    return value.length > 0 && value.length < 250;
  };

  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      value.length > 0 &&
      value.length < 250 &&
      String(email).toLowerCase().match(emailRegex)
    );
  };

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="false" style={{ padding: "0 15%" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              if (!validateEmail(email) || !validateText(password)) {
                e.preventDefault();
                return;
              }
              history.push("/dashboard");
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              error={!validateEmail(email)}
              required
              fullWidth
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!validateText(password)}
              required
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          {/* <Copyright /> */}
          <StickyFooter />
        </Box>
      </Container>
      <Container component="main" className={classes.layoutContainer}>
        <div className={classes.layout}>
          <Layout />
        </div>
      </Container>
    </div>
  );
}
