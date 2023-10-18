import React from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
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
  },
}));

const Drugsform = ({
  fetchSearchDrugs,
  textChangeHandler,
  checkBoxChangeHandler,
}) => {
  const classes = useStyles();

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      fetchSearchDrugs();
    }
  };

  return (
    <div style={{ margin: "10px 0" }}>
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
      <div>
        <FormControlLabel
          control={(
            <Checkbox
              onChange={checkBoxChangeHandler}
              color="primary"
              onKeyUp={(event) => handleKeyUp(event)}
              name="favorite"
              size="small"
            />
          )}
          label="Favorite"
        />
      </div>
      <Button
        size="small"
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={fetchSearchDrugs}
      >
        Search
      </Button>
    </div>
  );
};

Drugsform.propTypes = {
  fetchSearchDrugs: PropTypes.func.isRequired,
  textChangeHandler: PropTypes.func.isRequired,
  checkBoxChangeHandler: PropTypes.func.isRequired,
};

export default Drugsform;
