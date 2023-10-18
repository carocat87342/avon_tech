import React, { useEffect, useState } from "react";

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
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import Error from "../../../components/common/Error";
import useAuth from "../../../hooks/useAuth";
import AuthService from "../../../services/patient_portal/auth.service";
import { Image } from "./components";

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
    textAlign: "center",
    marginTop: theme.spacing(2),
    "& img": {
      maxWidth: 180,
      width: 170,
      height: 65,
      objectFit: "contain",
    },
    "& p": {
      fontSize: "16px",
      "& span": {
        fontWeight: 600,
      },
    },
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
  const {
    register, handleSubmit, errors,
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { patientLogin } = useAuth();
  const { clientCode } = useParams();
  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState(null);
  const [password, setPassword] = useState("");
  const [apiErrors, setApiErrors] = useState([]);

  useEffect(() => {
    AuthService.getClientCode(clientCode).then(
      (res) => {
        const { client_id } = res.data[0];
        setClientId(client_id);
      },
      (error) => {
        if (!error.response) {
          return;
        }
        const { data, status } = error.response;

        if (status === 400) {
          setApiErrors([
            {
              msg: data.message,
            },
          ]);
        } else {
          setApiErrors([]);
        }
      },
    );
  }, [clientCode]);

  const onFormSubmit = async () => {
    try {
      await patientLogin(clientId, email.trim(), password.trim()); // Call AuthProvider login
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to login", {
        variant: "error",
      });
      setApiErrors([
        {
          msg: error.message,
        },
      ]);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.marginTop}>
        <div className={classes.Logo}>
          <Image
            className="clientLogo"
            src={`${process.env.REACT_APP_API_URL}static/client/c${clientId}_logo.png`}
            alt="Client Logo"
          />
        </div>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.lockIcon} />
          </Avatar>
          <Typography
            component="h1"
            variant="h2"
            className={classes.pageTitle}
          >
            Patient Login
          </Typography>
          <Error errors={apiErrors} />
          <form
            className={clsx({
              [classes.form]: true, // always apply
              [classes.withErrors]: errors.length > 0, // only when isLoading === true
            })}
            noValidate
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <TextField
              disabled={errors.length > 0}
              value={email}
              type="email"
              variant="outlined"
              margin="normal"
              inputRef={register({
                required: "You must provide the email address!",
                pattern: {
                  // eslint-disable-next-line max-len, no-useless-escape
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "You must provide a valid email address!",
                },
              })}
              error={!!errors.email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              fullWidth
              autoFocus
              required
              onChange={(event) => setEmail(event.target.value)}
              helperText={errors?.email?.message}
            />
            <TextField
              disabled={errors.length > 0}
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
              disabled={!email || !password || errors.length > 0}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Sign In
            </Button>
          </form>
          <Grid container className={classes.meta}>
            <Grid item xs={6}>
              <Link href={`/signup/${clientCode}`} variant="body2">
                Don&apos;t have an account? Register.
              </Link>
            </Grid>
            <Grid item xs={6} className={classes.forgotPass}>
              <Link href={`/forgot/${clientCode}`} variant="body2">
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
