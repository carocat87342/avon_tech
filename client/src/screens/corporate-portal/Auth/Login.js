import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import clsx from "clsx";
import { useSnackbar } from "notistack";

import Logo from "../../../assets/img/Logo.svg";
import Error from "../../../components/common/Error";
import useAuth from "../../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 15px 35px 0 rgb(60 66 87 / 8%), 0 5px 15px 0 rgb(0 0 0 / 12%)",
    padding: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(16),
  },
  Logo: {
    maxWidth: "180px",
    width: 170,
    height: 65,
    objectFit: "contain",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  },
  lockIcon: {
    fontSize: "40px",
  },
  pageTitle: {
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  withErrors: {
    opacity: 0.9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  meta: {
    "& a": {
      color: theme.palette.text.secondary,
      fontSize: "12px",
    },
  },
  forgotPass: {
    textAlign: "right",
  },
}));

const PatientLogin = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { corporateLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onFormSubmit = async () => {
    try {
      await corporateLogin(email.trim(), password.trim()); // Call AuthProvider login
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to login", {
        variant: "error",
      });
      setErrors([
        {
          msg: error.message,
        },
      ]);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid className={classes.marginTop}>
        <CssBaseline />
        <img src={Logo} alt="Logo" className={classes.Logo} />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.lockIcon} />
          </Avatar>
          <Typography
            component="h1"
            variant="h2"
            className={classes.pageTitle}
          >
            Corporate Sign in
          </Typography>

          <Error errors={errors} />

          <form
            className={clsx({
              [classes.form]: true, // always apply
            })}
            noValidate
          >
            <TextField
              value={email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              value={password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              disabled={!email || !password}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => onFormSubmit(event)}
            >
              Sign In
            </Button>
          </form>
          <Grid container className={classes.meta}>
            <Grid item xs={6} />
            <Grid item xs={6} className={classes.forgotPass}>
              <Link href="/corp/forgot-password" variant="body2">
                Forgot your password? Reset.
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
};

export default PatientLogin;
