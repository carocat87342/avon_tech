import React, { useState, useEffect } from "react";

import {
  Grid,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import useDebounce from "../../hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
  relativePosition: {
    position: "relative",
  },
  resultsContainer: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    background: theme.palette.common.white,
    maxHeight: 150,
    overflow: "scroll",
  },
}));

const DebounceSelect = (props) => {
  const classes = useStyles();
  const {
    label, required, controller, getOptionLabel, getOptionValue, onChange, fullWidth, textRequiredLength,
  } = props;
  // states
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [valueSelected, setValueSelected] = useState(null);

  const debouncedSearchTerm = useDebounce(inputText, 500);

  useEffect(() => {
    if (debouncedSearchTerm && (valueSelected !== inputText)) {
      if (debouncedSearchTerm.length > textRequiredLength) {
        const reqBody = {
          data: {
            text: debouncedSearchTerm,
          },
        };
        controller(reqBody)
          .then((res) => {
            setSearchResults(res.data);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handlePatientChange = (option) => {
    const selectedValue = getOptionValue(option);
    const selectedLabel = getOptionLabel(option);
    onChange(selectedValue);
    setInputText(selectedLabel);
    setValueSelected(selectedLabel);
  };

  const showOptions = !!searchResults && searchResults.length && !valueSelected;

  return (
    <Grid
      className={classes.relativePosition}
    >
      <TextField
        required={required}
        variant="outlined"
        label={label}
        margin="dense"
        fullWidth={fullWidth}
        value={inputText}
        onChange={(e) => {
          if (valueSelected) {
            setValueSelected(null);
          }
          if (e.target.value === "") {
            setSearchResults([]);
          }
          setInputText(e.target.value);
        }}
      />
      {
        showOptions ? (
          <Paper className={classes.resultsContainer}>
            <List>
              {searchResults.map((option) => (
                <ListItem
                  button
                  onClick={() => handlePatientChange(option)}
                  key={option.id}
                >
                  <ListItemText primary={getOptionLabel(option)} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )
          : null
      }
    </Grid>
  );
};

DebounceSelect.defaultProps = {
  fullWidth: false,
  textRequiredLength: 1,
};

DebounceSelect.propTypes = {
  controller: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool,
  textRequiredLength: PropTypes.number,
};

export default DebounceSelect;
