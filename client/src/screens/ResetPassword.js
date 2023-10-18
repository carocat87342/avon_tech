import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

import Logo from "../assets/img/Logo.svg";
import Error from "../components/common/Error";
import AuthService from "../services/auth.service";
import Success from "./ForgetPassword/Success";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
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
  resetPasswordFormSentWrapper: {},
  resetPasswordFormWrapper: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    AuthService.resetPassword(userId, token, password).then(
      (response) => {
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        setSuccess(true);
      },
      (error) => {
        if (!error.response) {
          return;
        }
        const { data, status } = error.response;

        if (status === 400) {
          setFieldErrors(data.message);
        } else {
          setFieldErrors([]);
        }
      },
    );
    setPassword("");
    setConfirmPassword("");
  };

  const validatePasswod = (event) => {
    if (event.target.value.length < 8) {
      setFieldErrors([
        {
          value: event.target.value,
          msg: "Too Weak. Must be atleast 8 Characters",
          param: "user.password",
        },
      ]);
    } else {
      setFieldErrors([]);
    }
  };
  const validatePasswodConfirm = () => {
    if (confirmPassword !== password) {
      setFieldErrors([
        {
          value: `password: ${password} confirmPassword ${confirmPassword}`,
          msg: "Password and ConfirmPassword must be same!",
        },
      ]);
    }
    if (confirmPassword === password) {
      setFieldErrors([]);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Grid className={classes.marginTop}>
        <img src={Logo} alt="Logo" className={classes.Logo} />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.lockIcon} />
          </Avatar>
          <Typography component="h1" variant="h2" className={classes.pageTitle}>
            Update Your Password
          </Typography>
          <Error errors={fieldErrors} />
          {success && (
            <Success
              header="Your password has been saved."
              loginText="Sign back in"
            />
          )}
          {!success && (
            <div className={classes.resetPasswordFormWrapper}>
              <form className={classes.form} noValidate>
                <TextField
                  value={password}
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  onChange={(event) => setPassword(event.target.value)}
                  onBlur={(event) => validatePasswod(event)}
                />
                <TextField
                  value={confirmPassword}
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  onBlur={(event) => validatePasswodConfirm(event)}
                />
                <Button
                  fullWidth
                  disabled={
                    !password || !confirmPassword || password !== confirmPassword
                  }
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => handlePasswordReset(event)}
                >
                  Submit
                </Button>
              </form>
            </div>
          )}
        </div>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
