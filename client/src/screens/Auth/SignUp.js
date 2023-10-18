import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useSnackbar } from "notistack";

import Logo from "../../assets/img/Logo.svg";
import AuthService from "../../services/auth.service";
import EmailService from "../../services/email.service";
import PracticeForm from "./components/PracticeForm";
import Success from "./components/Success";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 15px 35px 0 rgb(60 66 87 / 8%), 0 5px 15px 0 rgb(0 0 0 / 12%)",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  },
  lockIcon: {
    fontSize: "40px",
  },
  Logo: {
    maxWidth: "180px",
    width: 170,
    height: 65,
    objectFit: "contain",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [signedUpUser, setSignedUpUser] = useState([]);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const sendVerificationEmail = (data) => {
    EmailService.sendEmailVerification(data).then(
      () => {
        setSuccess(true);
      },
      (error) => {
        setSuccess(false);
        enqueueSnackbar(`${error.response.data}`, {
          variant: "error",
        });
      },
    );
  };

  const handleFormSubmit = (data) => {
    AuthService.register(data).then(
      (response) => {
        if (response.data) {
          setSuccess(true);
          sendVerificationEmail(response.data.data.user);
          setSignedUpUser(response.data.data.user);
        }
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
      },
      (error) => {
        if (error.response) {
          setErrors(error.response.data.message);
        }
      },
    );
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Practitioner Sign Up
        </Typography>
        {success ? (
          <Success user={signedUpUser} />
        ) : (
          <PracticeForm
            onFormSubmit={handleFormSubmit}
            errors={errors}
          />
        )}
      </div>
    </Container>
  );
};

export default SignUp;
