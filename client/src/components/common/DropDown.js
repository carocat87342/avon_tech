
import React from "react";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    bottom: theme.spacing(0.5),
    minWidth: 100,
  },
}));

const DropDown = (props) => {
  const classes = useStyles();
  const {
    label, name, value, options, onSelectChange,
  } = props;
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        required
        name={name}
        margin="dense"
        fullWidth
        value={value}
        onChange={(e) => onSelectChange(e.target.value)}
        placeholder={label}
      >
        {options.length
          ? options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
          : (
            <MenuItem value="">
              No Items available
            </MenuItem>
          )}
      </Select>
    </FormControl>
  );
};

DropDown.defaultProps = {
  name: "",
  label: "",
  value: "",
};

DropDown.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onSelectChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};

export default DropDown;
