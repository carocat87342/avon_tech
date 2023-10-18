import React from "react";

import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const VerificationMessage = ({ severity, message }) => (
  <Alert severity={severity}>{message}</Alert>
);

VerificationMessage.defaultProps = {
  severity: "error",
};

VerificationMessage.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default VerificationMessage;
