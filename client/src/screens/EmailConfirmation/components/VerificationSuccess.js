import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

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

const VerificationSuccess = ({ isEmailVerified }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {isEmailVerified ? (
          <p>
            Your can login here:
            {" "}
            <Link href={`${process.env.REACT_APP_SITE_URL}login_client`}>
              {`${process.env.REACT_APP_SITE_URL}login_client`}
            </Link>
          </p>
        ) : (
          <>
            <p>Thank you for confirming your email address. </p>
            <p>
              Your login page is
              {" "}
              <Link href={`${process.env.REACT_APP_SITE_URL}login_client`}>
                {`${process.env.REACT_APP_SITE_URL}login_client`}
              </Link>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

VerificationSuccess.propTypes = {
  isEmailVerified: PropTypes.bool.isRequired,
};

export default VerificationSuccess;
