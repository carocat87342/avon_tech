import React from "react";

import {
  Button,
  Switch,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
  },
  controlLabel: {
    marginLeft: "0px",
    marginRight: "0px",
  },
  textField: {
    width: "250px",
  },
  submit: {
    marginTop: theme.spacing(1),
    padding: "4px 30px",
    fontSize: "1rem",
    maxWidth: "100px",
  },
  check: {
    marginLeft: "7px",
    marginTop: "5px",
  },
}));

const ICDcodesform = ({
  fetchSearchIcdCodes,
  textChangeHandler,
  checkBoxChangeHandler,
}) => {
  const classes = useStyles();
  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      fetchSearchIcdCodes();
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        size="small"
        variant="outlined"
        autoFocus
        onChange={textChangeHandler}
        className={classes.textField}
        name="searchTerm"
        label="Name"
        onKeyUp={(event) => handleKeyUp(event)}
      />
      <FormControlLabel
        control={(
          <Switch
            onChange={checkBoxChangeHandler}
            color="primary"
            onKeyUp={(event) => handleKeyUp(event)}
            name="favorite"
            size="small"
            className={classes.check}
          />
        )}
        label="Favorite"
      />

      <Button
        size="small"
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={fetchSearchIcdCodes}
      >
        Search
      </Button>
    </div>
  );
};

ICDcodesform.propTypes = {
  fetchSearchIcdCodes: PropTypes.func.isRequired,
  textChangeHandler: PropTypes.func.isRequired,
  checkBoxChangeHandler: PropTypes.func.isRequired,
};

export default ICDcodesform;
