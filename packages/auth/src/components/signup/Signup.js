import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Checkbox,
  TextField,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Copyright from "../copyright/Copyright";
import Layout from "../layout/layout";
import signUpStyles from "./signUpStyles";
import StickyFooter from "../../../../container/src/components/Footer";

export default function SignUp() {
  const classes = signUpStyles();
  const history = useHistory();
  const systemDate = new Date().setHours(0, 0, 0, 0);
  const minimumDate = new Date("01-01-1970").setHours(0, 0, 0, 0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const date = new Date();
  const month = Number(date.getMonth()) + 1;
  const monthStr = month > 9 ? month.toString() : "0" + month.toString();
  const dateStr = date.getFullYear() + "-" + monthStr + "-" + date.getDate();
  const [dob, setDob] = useState(dateStr);

  const validateText = (value) => {
    return value.length > 0 && value.length < 250;
  };

  const validatePhone = (value) => {
    return value.length === 10 && Number(value) > 0;
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
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              if (
                !validateText(firstName) ||
                !validateText(lastName) ||
                !validatePhone(phone) ||
                !dob ||
                !validateEmail(email) ||
                !validateText(password)
              ) {
                e.preventDefault();
                return;
              }
              history.push("/dashboard");
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  error={!validateText(firstName)}
                  variant="outlined"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  error={!validateText(lastName)}
                  autoComplete="lname"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  error={!validatePhone(phone)}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  error={!dob}
                  value={dob}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    if (
                      date.setHours(0, 0, 0, 0) >= systemDate ||
                      date.setHours(0, 0, 0, 0) <= minimumDate
                    ) {
                      setDob(new Date(systemDate));
                    } else {
                      setDob(e.target.value);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!validateEmail(email)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!validateText(password)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/auth/signin" variant="body2">
                  Already have an account? Sign in
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
