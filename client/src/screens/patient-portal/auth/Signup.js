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
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";

import Error from "../../../components/common/Error";
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
  link: {
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

const PatientSignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    register, handleSubmit, errors,
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { clientCode } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiErrors, setApiErrors] = useState([]);

  const [client, setClient] = useState(null);
  const [clientError, setClientError] = useState([]);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  useEffect(() => {
    AuthService.getClientCode(clientCode).then(
      (res) => {
        setClient(res.data[0]);
      },
      (error) => {
        if (!error.response) {
          return;
        }
        const { data, status } = error.response;

        if (status === 400) {
          setClientError([
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

  const onFormSubmit = () => {
    const formData = {
      patient: {
        status: "A",
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        client_id: client?.client_id,
      },
    };
    AuthService.register(formData).then(
      (response) => {
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        setSignUpSuccess(true);
      },
      (error) => {
        if (error.response) {
          setApiErrors(error.response.data.message);
        }
      },
    );
  };

  const navigateToLogin = () => {
    history.push(`/login/${clientCode}`);
  };

  const RegistrationSuccess = () => (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon className={classes.lockIcon} />
      </Avatar>
      <Typography
        component="h1"
        variant="h2"
        className={classes.pageTitle}
      >
        {`${client && client.name} Registration Confirmation`}
      </Typography>
      <Typography variant="body2" gutterBottom>
        The registration was successful. Please login to the portal
        {" "}
        <span aria-hidden="true" className={classes.link} onClick={() => navigateToLogin()}>
          here
        </span>
        .
      </Typography>
    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      <Grid className={classes.marginTop}>
        <CssBaseline />
        {signUpSuccess && (
          <RegistrationSuccess />
        )}
        {!signUpSuccess && (
          clientError.length > 0 ? (
            <div className={`${classes.paper} ${classes.ErrorSection}`}>
              <Error errors={clientError} variant="filled" />
              <Alert icon={false} severity="info">
                Go back to
                {" "}
                <Link to="/">Home page</Link>
              </Alert>
            </div>
          ) : (
            <>
              <div className={classes.Logo}>
                <Image
                  className="clientLogo"
                  src={`${process.env.REACT_APP_API_URL}static/client/c${client?.client_id}_logo.png`}
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
                  Patient Sign Up
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
                    value={firstName}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    autoFocus
                    id="firstName"
                    label="Firstname"
                    name="firstName"
                    autoComplete="firstName"
                    onChange={(event) => setFirstName(event.target.value)}
                    inputProps={{ maxLength: 35 }}
                    helperText={`${firstName.length >= 35
                      ? "Enter a first name between 35 charecter"
                      : ""
                    }`}
                  />
                  <TextField
                    value={lastName}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="lastName"
                    label="Lastname"
                    name="lastName"
                    autoComplete="lastName"
                    onChange={(event) => setLastName(event.target.value)}
                    inputProps={{ maxLength: 35 }}
                    helperText={`${lastName.length >= 35 ? "Enter a last name between 35 charecter" : ""
                    }`}
                  />
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
                    disabled={!firstName || !lastName || !email || !password || errors.length > 0}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </form>
                <Grid container className={classes.meta}>
                  <Grid item xs={12}>
                    <Link href={`/login/${clientCode}`}>
                      Already have an account?
                      {" "}
                      Login here.
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </>
          ))}
      </Grid>
    </Container>
  );
};

export default PatientSignUp;
