import React, { useState, useEffect, useCallback } from "react";

import {
  Button,
  Grid,
  Typography,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import DebounceSelect from "../../../../../components/common/DebounceSelect";
import usePatientContext from "../../../../../hooks/usePatientContext";
import PatientService from "../../../../../services/patient.service";
import { BillSelectionFields } from "../../../../../static/requisitionform";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  border: {
    border: "1px solid grey",
    padding: 10,
  },
  height100: {
    height: "100%",
  },
  actionContainer: {
    marginTop: theme.spacing(2),
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  removeButton: {
    fontWeight: 600,
  },
}));

const Requisitions = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = usePatientContext();
  const { onClose } = props;
  const [billSelection, setBillSelection] = useState("physician");
  const [orderedTests, setOrderedTests] = useState([]);
  const [favoriteTests, setFavoriteTests] = useState([]);
  const [labortories, setLabortories] = useState([]);
  const [selectedLab, setSelectedLab] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);

  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const fetchOrderedTests = useCallback(() => {
    PatientService.getOrderedTests(patientId, encounterId).then((res) => {
      setOrderedTests(res.data);
    });
  }, [patientId, encounterId]);

  const fetchFavoriteTests = useCallback(() => {
    PatientService.getFavoriteTests(patientId, encounterId).then((res) => {
      setFavoriteTests(res.data);
    });
  }, [patientId, encounterId]);

  const fetchLabortories = useCallback(() => {
    PatientService.getLabortories(patientId, encounterId).then((res) => {
      setLabortories(res.data);
    });
  }, [patientId, encounterId]);

  const deleteOrderedTestHandler = useCallback((testId) => {
    PatientService.deleteOrderedTests(testId).then((res) => {
      if (res.data) {
        enqueueSnackbar(`${res.message}`, { variant: "success" });
        fetchOrderedTests();
      }
    });
  }, [enqueueSnackbar, fetchOrderedTests]);

  useEffect(() => {
    fetchOrderedTests();
    fetchFavoriteTests();
    fetchLabortories();
  }, [fetchOrderedTests, fetchFavoriteTests, fetchLabortories]);

  const handleBillSelection = (e) => {
    setBillSelection(e.target.value);
  };

  const onFormSubmit = () => {
    const reqBody = {
      data: {
        marker_id: selectedLab.id,
      },
    };
    PatientService.createRequisition(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        onClose();
      });
  };

  const onCheckBoxChangeHandler = (e) => {
    const tempSelectedLabs = [...selectedLabs];
    if (e.target.checked) {
      tempSelectedLabs.push(e.target.name);
      setSelectedLabs([...tempSelectedLabs]);
    } else {
      const index = selectedLabs.findIndex((x) => x === e.target.name);
      tempSelectedLabs.splice(index, 1);
      setSelectedLabs([...tempSelectedLabs]);
    }
  };

  const searchLab = async (reqBody) => {
    try {
      const res = await PatientService.searchLabs(reqBody);
      return res;
    } catch (err) {
      throw err.response;
    }
  };

  return (
    <>
      <Grid className={classes.heading} container justify="space-between">
        <Typography variant="h3" color="textSecondary">
          Select Lab
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item lg={3}>
          <FormControl component="fieldset" className={classes.section}>
            <FormLabel component="legend">Bill To</FormLabel>
            <RadioGroup
              row
              value={billSelection}
              onChange={handleBillSelection}
              name="position"
              defaultValue="top"
            >
              {BillSelectionFields.map((item) => (
                <FormControlLabel
                  key={`${item.label}_${item.value}`}
                  value={item.value}
                  label={item.label}
                  control={<Radio color="primary" />}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Grid className={classes.section}>
            <Typography gutterBottom variant="h4" color="textSecondary">
              Recommended
            </Typography>
            {orderedTests.length
              ? orderedTests.map((item) => (
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  key={item.id}
                >
                  <Typography variant="body1">
                    {item.name}
                  </Typography>
                  <Button
                    className={classes.removeButton}
                    onClick={() => deleteOrderedTestHandler(item.id)}
                  >
                    [Remove]
                  </Button>
                </Grid>
              ))
              : (
                <Typography
                  variant="body1"
                  gutterBottom
                >
                  No Tests available...
                </Typography>
              )}
          </Grid>
          <Grid item lg={9} className={classes.border}>
            <Typography
              gutterBottom
              variant="h5"
              color="textPrimary"
            >
              Labortories
            </Typography>
            <FormControlLabel
              label="All"
              control={(
                <Checkbox
                  color="primary"
                  checked={!selectedLabs.length}
                  onChange={() => setSelectedLabs([])}
                />
              )}
            />
            {labortories.map((item) => (
              <Grid key={item.id}>
                <FormControlLabel
                  value={item.id}
                  label={item.name}
                  control={(
                    <Checkbox
                      name={item.name}
                      color="primary"
                      checked={selectedLabs.includes(item.name)}
                      onChange={(e) => onCheckBoxChangeHandler(e)}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <Grid item lg={8} className={classes.heading}>
            <DebounceSelect
              label="Search"
              required={false}
              controller={(value) => searchLab(value)}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={(value) => setSelectedLab(value)}
            />
          </Grid>

        </Grid>
        <Grid item lg={6}>
          <Grid className={`${classes.border} ${classes.height100}`}>
            <Typography gutterBottom variant="h5" color="textPrimary">
              Favorites
            </Typography>
            <Grid container spacing={2}>
              {favoriteTests.length
                ? favoriteTests.map((item) => (
                  <Grid item lg={6} key={`${item.id}_${item.name}`}>
                    <FormControlLabel
                      value={item.id}
                      label={item.name}
                      control={<Checkbox color="primary" />}
                    />
                  </Grid>
                ))
                : (
                  <Grid item lg={6}>
                    <Typography
                      variant="body1"
                      gutterBottom
                    >
                      No Tests available...
                    </Typography>
                  </Grid>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        className={classes.actionContainer}
        container
        justify="space-between"
      >
        <Grid>
          <Button
            variant="outlined"
            className={classes.mr2}
            onClick={() => onFormSubmit()}
          >
            Complete
          </Button>
          <Button variant="outlined" onClick={() => onFormSubmit()}>
            Complete and Fax
          </Button>
        </Grid>
        <Button variant="outlined" onClick={() => onClose()}>
          Cancel
        </Button>
      </Grid>
    </>
  );
};

Requisitions.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Requisitions;
