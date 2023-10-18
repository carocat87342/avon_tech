import React from "react";

import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const Error = ({ errors, variant, children }) => (
  <>
    {errors
      && errors.map((error, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Alert severity="error" variant={variant} key={index}>
          {error.msg}
          {children}
        </Alert>
      ))}
  </>
);

Error.defaultProps = {
  errors: null,
  children: null,
  variant: "outlined",
};

Error.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      msg: PropTypes.string.isRequired,
    }),
  ),
  variant: PropTypes.string,
  children: PropTypes.node,
};
export default Error;
