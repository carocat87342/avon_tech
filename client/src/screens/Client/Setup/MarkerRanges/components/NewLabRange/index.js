import React, {
  useState, useEffect, useCallback, useMemo,
} from "react";

import {
  TextField, Button, Grid, Paper, List, ListItem, ListItemText, MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../../../components/Dialog";
import useDidMountEffect from "../../../../../../hooks/useDidMountEffect";
import LabRangeService from "../../../../../../services/setup/labrange.service";
import {
  CompareItemOptions,
  AgeCompareOperatorOptions,
  GenderCompareOperatorOptions,
  CompareToOptions,
} from "../../../../../../static/setup/labRange";

const useStyles = makeStyles((theme) => ({
  relativePosition: {
    position: "relative",
  },
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
  buttonsContainer: {
    margin: theme.spacing(0, 0, 3, 0),
  },
  w100: {
    width: 100,
  },
  ml2: {
    marginLeft: theme.spacing(2),
  },
  resultsContainer: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    background: theme.palette.common.white,
    maxHeight: 150,
    overflow: "scroll",
  },
  menuOption: {
    minHeight: 26,
  },
}));

const NewLabRange = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    isOpen, onClose, reloadData, selectedItem, userName,
  } = props;

  const isNewDialog = useMemo(() => isEmpty(selectedItem), [selectedItem]);

  const [selectedTest, setSelectedTest] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTestResults, setSearchTestResults] = useState([]);
  const [formFields, setFormFields] = useState({
    sequence: 1,
    compareItem: "",
    compareOperator: "",
    compareTo: "",
    rangeLow: "",
    rangeHigh: "",
    created: `${moment().format("MMM DD YYYY")} ${userName}`,
    updated: `${moment().format("MMM DD YYYY")} ${userName}`,
  });

  const updateFields = () => {
    const createdDate = moment(selectedItem.created).format("MMM DD YYYY");
    const updatedDate = moment(selectedItem.updated).format("MMM DD YYYY");
    // populate form fields
    formFields.sequence = selectedItem.seq;
    formFields.compareItem = selectedItem.compare_item;
    formFields.compareOperator = selectedItem.compare_operator;
    formFields.compareTo = selectedItem.compare_to;
    formFields.rangeLow = selectedItem.range_low;
    formFields.rangeHigh = selectedItem.range_high;
    formFields.created = `${createdDate} ${selectedItem.created_user || ""}`;
    formFields.updated = `${updatedDate} ${selectedItem.updated_user || ""}`;
    setFormFields({ ...formFields });
    setSearchText(selectedItem.marker_name);
  };

  useEffect(() => {
    if (!isNewDialog) { /* edit scenario */
      updateFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewDialog, selectedItem]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: name === "compareTo" ? value.substring(0, 2) : value,
    });
  };

  const onSequenceInputChange = (e) => {
    const { value, name } = e.target;
    // eslint-disable-next-line
    const parsedInt = parseInt(value);

    if (parsedInt) {
      setFormFields({
        ...formFields,
        [name]: parsedInt,
      });
    } else if (value === "") {
      setFormFields({
        ...formFields,
        [name]: value,
      });
    }

    return null;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        marker_id: isNewDialog ? selectedTest?.id : selectedItem?.marker_id,
        seq: Number(formFields.sequence),
        compare_item: formFields.compareItem,
        compare_operator: formFields.compareOperator,
        compare_to: formFields.compareTo,
        range_low: formFields.rangeLow,
        range_high: formFields.rangeHigh,
      },
    };
    if (isNewDialog) {
      if (selectedTest) {
        LabRangeService.createLabRange(reqBody).then((response) => {
          enqueueSnackbar(`${response.message}`, { variant: "success" });
          reloadData();
          onClose();
        });
      } else {
        enqueueSnackbar(`Please select marker`, { variant: "error" });
      }
    } else { /* edit scenario */
      const editItemId = selectedItem.id;
      LabRangeService.updateLabRange(reqBody, editItemId).then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        reloadData();
        onClose();
      });
    }
  };

  const searchTests = useCallback((e, text) => {
    e.preventDefault();
    LabRangeService.searchTests(text).then((res) => {
      setSearchTestResults(res.data);
    });
  }, []);

  const testSelectHandler = (value) => {
    setSelectedTest(value);
    setSearchText(value.name);
    setSearchTestResults([]);
  };

  useDidMountEffect(() => {
    if (searchText && !searchText.length) {
      setSearchTestResults([]);
    }
  }, [searchText]);

  const populateDecimalValue = (value) => {
    if (formFields[value].length) {
      setFormFields({
        ...formFields,
        [value]: Number(formFields[value]).toFixed(2),
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      title={`${isNewDialog ? "New" : "Edit"} Marker Range`}
      message={(
        <>
          <Grid item lg={8}>
            <form onSubmit={(e) => searchTests(e, searchText)}>
              <Grid container alignItems="center" className={classes.gutterBottom}>
                <Grid item xs={8} className={classes.relativePosition}>
                  <TextField
                    fullWidth
                    autoFocus={!!isNewDialog}
                    label="Marker"
                    size="small"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    inputProps={{
                      readOnly: !isNewDialog,
                    }}
                  />
                  {
                    searchTestResults.length ? (
                      <Paper className={classes.resultsContainer}>
                        <List>
                          {searchTestResults.map((option) => (
                            <ListItem
                              button
                              onClick={() => testSelectHandler(option)}
                              key={option.id}
                            >
                              <ListItemText primary={option.name} />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    )
                      : null
                  }
                </Grid>
                {isNewDialog && (
                  <Button
                    variant="outlined"
                    type="submit"
                    className={classes.ml2}
                  >
                    Search
                  </Button>
                )}
              </Grid>
            </form>

            <form onSubmit={onFormSubmit}>
              <Grid item lg={8}>
                <TextField
                  variant="outlined"
                  name="sequence"
                  id="sequence"
                  type="number"
                  label="Sequence"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.sequence}
                  onChange={(e) => onSequenceInputChange(e)}
                />

                <TextField
                  select
                  variant="outlined"
                  name="compareItem"
                  id="compareItem"
                  type="number"
                  label="Compare Item"
                  size="small"
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.compareItem}
                  onChange={(e) => handleInputChange(e)}
                >
                  {CompareItemOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value} className={classes.menuOption}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  variant="outlined"
                  name="compareOperator"
                  id="compareOperator"
                  type="number"
                  label="Compare Operator"
                  size="small"
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.compareOperator}
                  onChange={(e) => handleInputChange(e)}
                >
                  {formFields.compareItem === "A"
                    ? AgeCompareOperatorOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value} className={classes.menuOption}>
                        {option.label}
                      </MenuItem>
                    ))
                    : GenderCompareOperatorOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value} className={classes.menuOption}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>

                <TextField
                  select={formFields.compareItem === "G"}
                  variant="outlined"
                  name="compareTo"
                  id="compareTo"
                  type="number"
                  label="Compare To"
                  size="small"
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.compareTo}
                  onChange={(e) => handleInputChange(e)}
                >
                  {CompareToOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value} className={classes.menuOption}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  variant="outlined"
                  name="rangeLow"
                  id="rangeLow"
                  type="number"
                  label="Range Low"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.rangeLow}
                  onChange={(e) => handleInputChange(e)}
                  onBlur={() => populateDecimalValue("rangeLow")}
                />

                <TextField
                  variant="outlined"
                  name="rangeHigh"
                  id="rangeHigh"
                  type="number"
                  label="Range High"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.rangeHigh}
                  onChange={(e) => handleInputChange(e)}
                  onBlur={() => populateDecimalValue("rangeHigh")}
                />

                <TextField
                  variant="outlined"
                  name="created"
                  id="created"
                  type="text"
                  label="Created"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.created}
                  onChange={(e) => handleInputChange(e)}
                  inputProps={{ readOnly: true }}
                />

                <TextField
                  variant="outlined"
                  name="updated"
                  id="updated"
                  type="text"
                  label="Updated"
                  size="small"
                  required
                  fullWidth
                  className={classes.gutterBottom}
                  value={formFields.updated}
                  onChange={(e) => handleInputChange(e)}
                  inputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid container className={classes.buttonsContainer} justify="space-between">
                <Button variant="outlined" type="submit" className={classes.w100}>
                  Save
                </Button>
              </Grid>
            </form>
          </Grid>
        </>
      )}
      cancelForm={() => onClose()}
      hideActions
      size="sm"
    />
  );
};

NewLabRange.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.number,
    marker_id: PropTypes.string,
    marker_name: PropTypes.string,
    seq: PropTypes.number,
    compare_item: PropTypes.string,
    compare_operator: PropTypes.string,
    compare_to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    range_low: PropTypes.number,
    range_high: PropTypes.number,
    created: PropTypes.string,
    updated: PropTypes.string,
    created_user: PropTypes.string,
    updated_user: PropTypes.string,
  }).isRequired,
};

export default NewLabRange;
