import React from "react";

import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

import Error from "../../../components/common/Error";

const TextFieldWithError = ({
  autoFocus,
  fieldName,
  label,
  value,
  handleOnChange,
  handleOnBlur,
  errors,
  type,
  id,
}) => (
  <>
    <TextField
      value={value}
      variant="outlined"
      margin="dense"
      autoFocus={
        autoFocus || false
      }
      required
      fullWidth
      id={id || fieldName}
      label={label}
      name={fieldName}
      type={type || "text"}
      autoComplete={fieldName}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
    <Error errors={errors} />
  </>
);

TextFieldWithError.defaultProps = {
  id: null,
  value: null,
  type: null,
  autoFocus: false,
};

TextFieldWithError.propTypes = {
  id: PropTypes.string,
  autoFocus: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleOnChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.array).isRequired,
  type: PropTypes.string,
};

export default TextFieldWithError;
