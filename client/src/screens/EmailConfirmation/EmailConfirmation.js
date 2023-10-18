import React, { useEffect, useState } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dimmer from "../../components/common/Dimmer";
import EmailService from "../../services/email.service";
import { VerificationMessage, VerificationSuccess } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    textAlign: "center",
    "& p": {
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
}));

const EmailConfirmation = ({ ...props }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const {
    match: { params },
  } = props;

  useEffect(() => {
    EmailService.emailVerify(params.userId, params.token).then(
      (response) => {
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });

        if (response.data.isVerified) {
          setIsEmailVerified(true);
          setIsLoading(false);
          setMessage(response.data.message);
        }
        setIsLoading(false);
        setSuccess(true);
        setMessage(response.data.message);
      },
      (error) => {
        const resMessage = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString();

        setIsLoading(false);
        setMessage(resMessage);
        setSuccess(false);
        setShowError(true);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let severity = "error";
  if (showError) {
    severity = "error";
  }
  if (isEmailVerified) {
    severity = "info";
  }
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          {(showError || isEmailVerified) && (
            <VerificationMessage severity={severity} message={message} />
          )}
          {success && <VerificationSuccess isEmailVerified={isEmailVerified} />}
        </CardContent>
      </Card>

      <Dimmer isOpen={isLoading} />
    </>
  );
};

EmailConfirmation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.number.isRequired,
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default EmailConfirmation;
