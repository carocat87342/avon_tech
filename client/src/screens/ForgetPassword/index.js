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
import { useSnackbar } from "notistack";
import { useSelector, shallowEqual } from "react-redux";

import Logo from "../../assets/img/Logo.svg";
import Dimmer from "../../components/common/Dimmer";
import Error from "../../components/common/Error";
import AuthService from "../../services/auth.service";
import EmailService from "../../services/email.service";
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
  Error: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  meta: {
    textAlign: "right",
    "& a": {
      color: theme.palette.text.secondary,
      fontSize: 12,
    },
  },
  Logo: {
    maxWidth: "180px",
    width: 170,
    height: 65,
    objectFit: "contain",
  },
}));

const ForgetPassword = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [registrationLink, setRegistrationLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const success = useSelector((state) => state.common.success, shallowEqual);

  const sendPasswordResetEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    AuthService.passwordChangeRequest(email).then(
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
                  "resendEmailVerification error.response",
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
        <img src={Logo} alt="Logo" className={classes.Logo} />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.lockIcon} />
          </Avatar>
          <Typography component="h1" variant="h2" className={classes.pageTitle}>
            Forgot Password
          </Typography>
          <Error errors={errors}>
            {registrationLink && (
              <Link href="/signup"> Go to user registration</Link>
            )}
          </Error>
          {success && (
            <Success
              header="If that account is in our system then we have sent an email with instructions
                to reset your password"
              loginText="Sign back in"
            />
          )}
          {!success && (
            <>
              <p>
                Enter your email and we will send you reset instructions.
              </p>
              <form
                className={classes.form}
                noValidate
                onSubmit={sendPasswordResetEmail}
              >
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(event) => setEmail(event.target.value)}
                  inputProps={{ maxLength: 255 }}
                  helperText={`${
                    email.length >= 255
                      ? "Enter an email between 255 charecter"
                      : ""
                  }`}
                />
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
                    <Link href="/login_client" variant="body2">
                      Login
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

export default ForgetPassword;
