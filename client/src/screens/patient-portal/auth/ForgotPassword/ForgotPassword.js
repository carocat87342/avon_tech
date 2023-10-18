import React, { useState, useEffect } from "react";

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
// import { KeyboardDatePicker } from "@material-ui/pickers";
import clsx from "clsx";
// import moment from "moment";
import { useSnackbar } from "notistack";
import { useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";

import Dimmer from "../../../../components/common/Dimmer";
import Error from "../../../../components/common/Error";
import EmailService from "../../../../services/email.service";
import AuthService from "../../../../services/patient_portal/auth.service";
import { Image } from "../components";
import Success from "./Success";

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
  dateOfBirth: {
    width: "100%",
  },
  Error: {
    marginTop: theme.spacing(2),
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
    textAlign: "right",
    "& a": {
      color: theme.palette.text.secondary,
      fontSize: "12px",
    },
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { clientCode } = useParams();
  const [client, setClient] = useState(null);
  const [email, setEmail] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [postal, setPostal] = useState("");
  const [errors, setErrors] = useState([]);
  const [registrationLink, setRegistrationLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [dob, handleDateChange] = useState(new Date());
  const success = useSelector((state) => state.common.success, shallowEqual);


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
          setErrors([
            {
              msg: data.message,
            },
          ]);
        } else {
          setErrors([]);
        }
      },
    );
  }, [clientCode]);


  const sendPasswordResetEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    AuthService.passwordChangeRequest(email, {
      patient: {
        // dob: moment(dob).format("YYYY-MM-DD"),
        // lastname,
        // postal,
      },
    }).then(
      (response) => {
        setIsLoading(false);
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        setErrors([]);
      },
      (error) => {
        setIsLoading(false);
        if (error.response) {
          const { data, status } = error.response;
          if (status === 400) {
            setErrors(data.message);
          } else {
            setErrors([]);
          }
          if (data && data.user && data.user.sign_dt === null) {
            setRegistrationLink(true);
          }

          if (data && data.user && data.user.email_confirm_dt === null) {
            setRegistrationLink(false);
            // Send email verification link
            EmailService.resendEmailVerification(error.response.data.user).then(
              (response) => {
                console.info(
                  "resendEmailVerification response",
                  response.response,
                );
              },
              (err) => {
                console.error(
                  "resendEmailVerification err.response",
                  err.response,
                );
              },
            );
          }
        }
      },
    );
    setEmail("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.marginTop}>
        <div className={classes.Logo}>
          <Image
            lassName="clientLogo"
            src={`${process.env.REACT_APP_API_URL}static/client/c${client?.client_id}_logo.png`}
            alt="Client Logo"
          />
        </div>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.lockIcon} />
          </Avatar>
          <Typography component="h1" variant="h2" className={classes.pageTitle}>
            Patient Forgot password
          </Typography>
          <Error errors={errors} variant="filled">
            {registrationLink && (
              <Link href={`/signup/${clientCode}`}> Go to user registration</Link>
            )}
          </Error>
          {success && (
            <Success
              header="If that account is in our system then we have sent an email with instructions
              to reset your password"
              loginText="Sign back in"
              client={client}
            />
          )}
          {!success && (
            <>
              <p>
                Enter your email and we will send you reset instructions.
              </p>
              <form
                className={clsx({
                  [classes.form]: true, // always apply
                  [classes.withErrors]: errors.length > 0, // only when isLoading === true
                })}
                noValidate
                onSubmit={sendPasswordResetEmail}
              >
                <TextField
                  disabled={errors.length > 0}
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  autoFocus
                  onChange={(event) => setEmail(event.target.value)}
                />
                {/* <KeyboardDatePicker
                  disabled={errors.length > 0}
                  className={classes.dateOfBirth}
                  margin="dense"
                  clearable
                  value={dob}
                  placeholder="2018/10/10"
                  onChange={(date) => handleDateChange(date)}
                  format="yyyy-MM-dd"
                  inputVariant="outlined"
                />
                <TextField
                  disabled={errors.length > 0}
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="lastname"
                  label="Last name"
                  name="lastname"
                  autoComplete="lastname"
                  value={lastname}
                  autoFocus
                  onChange={(event) => setLastname(event.target.value)}
                />
                <TextField
                  disabled={errors.length > 0}
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  name="zipcode"
                  autoComplete="zipcode"
                  value={postal}
                  autoFocus
                  onChange={(event) => setPostal(event.target.value)}
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!email}
                >
                  Reset
                </Button>
                <Grid container className={classes.meta}>
                  <Grid item xs>
                    <Link href={`/login/${clientCode}`} variant="body2">
                      Already have an account? Sign in.
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </div>
        <Dimmer isOpen={isLoading} />
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
