import React, { useEffect, useState, useCallback } from "react";

import {
  TextField,
  Typography,
  Grid,
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import { StyledTableCellSm, StyledTableRowSm } from "../../../components/common/StyledTable";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import usePatientContext from "../../../hooks/usePatientContext";
import { toggleMedicationDialog, resetSelectedMedication } from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";
import {
  NewDrugFormFields, GenericOptions, InputOptions, RefillsOptions,
  DEFAULT_AMOUNT, DEFAULT_EXPIRY, DEFAULT_FREQUENCY, DEFAULT_REFILLS,
} from "../../../static/medicationForm";
import { drugFrequencyLabelToCode, medicationFormToLabel, pickerDateFormat } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  ml2: {
    marginLeft: theme.spacing(2),
  },
  label: {
    margin: "0 2px 0 0",
    fontWeight: 500,
    fontSize: 13,
  },
  relativePosition: {
    position: "relative",
  },
  resultsContainer: {
    position: "absolute",
    top: 40,
    zIndex: 2,
    width: "75%",
    background: theme.palette.common.white,
    maxHeight: 150,
    overflow: "scroll",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  textMessage: {
    lineHeight: "21px",
    fontSize: 12,
  },
  dateInput: {
    width: 175,
  },
  input: {
    minWidth: 175,
  },
  inputOptions: {
    "& button": {
      minWidth: "auto",
    },
  },
  listItem: {
    padding: "2px 0",
  },
  textClip: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  recentsContainer: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(8),
    },
  },
}));

const Medications = (props) => {
  const { reloadData } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { patientId } = state;
  const { selectedMedication } = state.medications;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const currentDate = new Date();
  const [hasDrugIdError, setHasDrugIdError] = useState(false);
  const [drugSearchResults, setDrugSearchResults] = useState([]);
  const [drugFrequencies, setDrugFrequencies] = useState([]);
  const [drugStrengths, setDrugStrengths] = useState([]);
  const [recentSelections, setRecentSelections] = useState([]);
  const [favoriteMedications, setFavoriteMedications] = useState([]);
  const [formFields, setFormFields] = useState({
    type: "",
    drug_id: "",
    strength: "",
    frequency: "",
    startDate: null,
    expires: "",
    amount: "",
    refills: "",
    patientInstructions: "",
    pharmacyInstructions: "",
    generic: "1",
  });

  const populateFormFields = (medication) => {
    formFields.type = medication.name;
    formFields.drug_id = medication.id || medication.drug_id;
    formFields.strength = medication.drug_strength_id;
    formFields.frequency = drugFrequencyLabelToCode(medication?.frequency || DEFAULT_FREQUENCY);
    formFields.startDate = medication?.start_dt ? pickerDateFormat(medication.start_dt) : currentDate;
    formFields.expires = medication?.expires || DEFAULT_EXPIRY;
    formFields.amount = medication?.amount || DEFAULT_AMOUNT;
    formFields.refills = medication?.refills || DEFAULT_REFILLS;
    formFields.patientInstructions = medication?.patient_instructions || "";
    formFields.pharmacyInstructions = medication?.pharmacy_instructions || "";
    formFields.generic = String(medication.generic);
    setFormFields({ ...formFields });
  };

  const fetchMedicationById = (medicationId) => {
    PatientService.getMedicationById(patientId, medicationId)
      .then((response) => {
        const medication = response.data?.length ? response.data[0] : {};
        populateFormFields(medication);
      });
  };

  useEffect(() => {
    if (selectedMedication) {
      // medication is selected
      fetchMedicationById(selectedMedication.id);
    } else {
      // default values selection
      formFields.frequency = DEFAULT_FREQUENCY;
      formFields.startDate = currentDate;
      formFields.expires = DEFAULT_EXPIRY;
      formFields.amount = DEFAULT_AMOUNT;
      formFields.refills = DEFAULT_REFILLS;
      setFormFields({ ...formFields });
    }
    return () => !!selectedMedication && dispatch(resetSelectedMedication());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMedication]);

  const fetchRecentMedications = useCallback(() => {
    PatientService.getMedicationRecents(patientId, encounterId)
      .then((response) => {
        setRecentSelections(response.data);
      });
  }, [patientId, encounterId]);

  const fetchFavoriteMedications = useCallback(() => {
    PatientService.getMedicationFavorites(patientId)
      .then((response) => {
        setFavoriteMedications(response.data);
      });
  }, [patientId]);

  const fetchDrugFrequencies = useCallback(() => {
    PatientService.getEncountersPrescriptionsDrugsFrequencies(patientId, encounterId)
      .then((response) => {
        setDrugFrequencies(response.data);
      });
  }, [patientId, encounterId]);

  const fetchDrugStrengths = useCallback((drugId) => {
    PatientService.getEncountersPrescriptionsDrugsStrengths(patientId, encounterId, drugId)
      .then((response) => {
        setDrugStrengths(response.data);
      });
  }, [patientId, encounterId]);

  useEffect(() => {
    fetchRecentMedications();
    fetchDrugFrequencies();
    fetchFavoriteMedications();
  }, [fetchRecentMedications, fetchDrugFrequencies, fetchFavoriteMedications]);

  useDidMountEffect(() => {
    if (+formFields.drug_id) { /* converts string to number, david */
      fetchDrugStrengths(formFields.drug_id);
    }
    if (hasDrugIdError) {
      setHasDrugIdError(false);
    }
  }, [formFields.drug_id]);

  useDidMountEffect(() => {
    if (!formFields.type.length) {
      const name = "drug_id";
      setFormFields({
        ...formFields,
        [name]: "",
      });
      setDrugSearchResults([]);
    }
  }, [formFields.type]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const name = "startDate";
    setFormFields({
      ...formFields,
      [name]: date,
    });
  };

  const handleDrugTypeChange = (value) => {
    const name = "type";
    const drugId = "drug_id";

    setFormFields({
      ...formFields,
      [name]: `${value.name}`,
      [drugId]: value.id,
    });
    setDrugSearchResults([]);
  };

  const renderOptionsForDropdowns = (value) => {
    switch (value) {
      case "Frequency": {
        const frequencyOptions = drugFrequencies.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.descr}
          </MenuItem>
        ));
        return frequencyOptions;
      }
      case "Strength": {
        const strengthOptions = drugStrengths.length
          ? drugStrengths.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {`${option.strength} ${option.unit} ${medicationFormToLabel(option.form)}`}
            </MenuItem>
          ))
          : (
            <MenuItem value="">
              No options available
            </MenuItem>
          );
        return strengthOptions;
      }
      default:
        return <div />;
    }
  };

  const inputOptionHandler = (name, value) => {
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderInputOptions = (value, inputName) => {
    switch (value) {
      case "Start Date": {
        return (
          <Grid container alignItems="center">
            <Typography className={classes.label}>Set to</Typography>
            <Button onClick={() => inputOptionHandler(inputName, currentDate)} size="small">Today</Button>
          </Grid>
        );
      }
      case "Expires (Days)": {
        return (
          <Grid container alignItems="center">
            <Typography className={classes.label}>Set to</Typography>
            {InputOptions.map((option) => (
              <Button
                key={option.label}
                size="small"
                onClick={() => inputOptionHandler(inputName, option.value)}
              >
                {option.label}
              </Button>
            ))}
          </Grid>
        );
      }
      case "Amount": {
        return (
          <Grid container alignItems="center">
            <Typography className={classes.label}>Set to</Typography>
            {InputOptions.map((option) => (
              <Button
                key={option.label}
                size="small"
                onClick={() => inputOptionHandler(inputName, option.value)}
              >
                {option.label}
              </Button>
            ))}
          </Grid>
        );
      }
      case "Refills": {
        return (
          <Grid container alignItems="center">
            <Typography className={classes.label}>Set to</Typography>
            {RefillsOptions.map((option) => (
              <Button
                key={option.label}
                size="small"
                onClick={() => inputOptionHandler(inputName, option.value)}
              >
                {option.label}
              </Button>
            ))}
          </Grid>
        );
      }
      default:
        return <div />;
    }
  };

  const prepareRequestBodyParams = () => {
    const bodyParams = {
      drug_id: formFields.drug_id,
      drug_frequency_id: formFields.frequency,
      drug_strength_id: Number(formFields.strength),
      start_dt: moment(formFields.startDate).format("YYYY:MM:DD"),
      expires: Number(formFields.expires),
      amount: Number(formFields.amount),
      refills: Number(formFields.refills),
      generic: Number(formFields.generic),
      patient_instructions: formFields.patientInstructions,
      pharmacy_instructions: formFields.pharmacyInstructions,
    };
    return bodyParams;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (formFields.type.length && formFields.drug_id !== "") {
      const reqBody = {
        data: prepareRequestBodyParams(),
      };
      if (selectedMedication) { // editing scenario
        const medicationId = selectedMedication.id;
        PatientService.updateMedication(patientId, medicationId, reqBody)
          .then((response) => {
            enqueueSnackbar(`${response.data.message}`, { variant: "success" });
            reloadData();
            dispatch(toggleMedicationDialog());
          });
      } else {
        PatientService.createMedication(patientId, reqBody)
          .then((response) => {
            enqueueSnackbar(`${response.data.message}`, { variant: "success" });
            reloadData();
            dispatch(toggleMedicationDialog());
          });
      }
    } else {
      enqueueSnackbar(`Drug selection is required`, { variant: "error" });
      setHasDrugIdError(true);
    }
  };

  const rowClickHandler = (row) => {
    populateFormFields(row);
  };

  const fetchDrugs = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        text: formFields.type,
      },
    };
    PatientService.searchEncountersPrescriptionsDrugs(reqBody).then((res) => {
      setDrugSearchResults(res.data);
    });
  };

  return (
    <>
      <Grid container>
        <Grid item lg={5} md={5} xs={12}>
          <Grid
            item
            lg={9}
            md={9}
            xs={12}
            className={classes.relativePosition}
          >
            <Box mb={1}>
              <form onSubmit={(e) => fetchDrugs(e)}>
                <Grid container alignItems="center">
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      autoFocus
                      size="small"
                      variant="outlined"
                      name="type"
                      label="Drug"
                      value={formFields.type}
                      onChange={(e) => handleInputChange(e)}
                      inputProps={{
                        autoComplete: "off",
                      }}
                      error={hasDrugIdError}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      type="submit"
                      className={classes.ml2}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
            <form
              onSubmit={onFormSubmit}
              id="prescriptions-form"
            >
              {NewDrugFormFields.map((item) => (
                <Box mb={1} key={item.id}>
                  {item.type === "date"
                    ? (
                      <Grid container alignItems="center">
                        <KeyboardDatePicker
                          key={item.id}
                          margin="dense"
                          inputVariant="outlined"
                          id="date-picker-dialog"
                          label={item.label}
                          format="MMM dd yyyy"
                          value={formFields.startDate}
                          onChange={handleDateChange}
                          required
                          minDate={undefined}
                          maxDate={undefined}
                          className={classes.dateInput}
                        />
                        <Box ml={2} className={classes.inputOptions}>
                          {renderInputOptions(item.label, item.name)}
                        </Box>
                      </Grid>
                    )
                    : (
                      <Grid container alignItems="center">
                        <TextField
                          key={item.id}
                          label={item.label}
                          variant="outlined"
                          margin="dense"
                          name={item.name}
                          id={item.id}
                          type={item.type}
                          value={formFields[item.name]}
                          fullWidth={item.multiline}
                          onChange={(e) => handleInputChange(e)}
                          required={item.required}
                          select={item.baseType === "select"}
                          className={classes.input}
                          multiline={item.multiline}
                          rows={3}
                          inputProps={{
                            autoComplete: "off",
                          }}
                        >
                          {item.baseType === "select" && renderOptionsForDropdowns(item.label)}
                        </TextField>
                        <Box ml={2} className={classes.inputOptions}>
                          {renderInputOptions(item.label, item.name)}
                        </Box>
                      </Grid>
                    )}
                </Box>
              ))}
              {
                (!!drugSearchResults && drugSearchResults.length) ? (
                  <Paper className={classes.resultsContainer}>
                    <List>
                      {drugSearchResults.map((drug) => (
                        <ListItem
                          button
                          onClick={() => handleDrugTypeChange(drug)}
                          key={drug.name}
                        >
                          <ListItemText primary={drug.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )
                  : null
              }
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={formFields.generic}
                  onChange={handleInputChange}
                  name="generic"
                  defaultValue="top"
                >
                  {GenericOptions.map((item) => (
                    <FormControlLabel
                      key={`${item.label}_${item.value}`}
                      value={item.value}
                      label={item.label}
                      control={<Radio color="primary" />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </form>
            <Grid
              container
              justify="space-between"
              component={Box}
              mt={2}
            >
              <Button
                variant="outlined"
                type="submit"
                form="prescriptions-form"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={1} md={1} xs={12}>
          <Typography variant="h5" gutterBottom>
            Favorites
          </Typography>
          <List>
            {favoriteMedications.length
              ? favoriteMedications.map((item) => (
                <ListItem
                  button
                  onClick={() => rowClickHandler(item)}
                  key={item.name}
                  disableGutters
                  classes={{
                    root: classes.listItem,
                  }}
                >
                  <ListItemText
                    classes={{
                      primary: classes.textClip,
                    }}
                    primary={item.name}
                  />
                </ListItem>
              ))
              : <Typography>No favorites found!</Typography>}
          </List>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Grid className={classes.recentsContainer}>
            <Typography variant="h5" gutterBottom>
              Recent selections, click to populate
            </Typography>
            <TableContainer>
              <Table size="small" aria-label="prescriptions-table">
                <TableHead>
                  <TableRow>
                    <StyledTableCellSm>Drug and Type</StyledTableCellSm>
                    <StyledTableCellSm>Strength</StyledTableCellSm>
                    <StyledTableCellSm>Frequency</StyledTableCellSm>
                    <StyledTableCellSm>Expires</StyledTableCellSm>
                    <StyledTableCellSm>Amount</StyledTableCellSm>
                    <StyledTableCellSm>Refills</StyledTableCellSm>
                    <StyledTableCellSm>Generic</StyledTableCellSm>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentSelections.map((row) => (
                    <StyledTableRowSm
                      key={row.created}
                      className={classes.cursorPointer}
                      onClick={() => rowClickHandler(row)}
                    >
                      <StyledTableCellSm>{row.name}</StyledTableCellSm>
                      <StyledTableCellSm>{row.strength}</StyledTableCellSm>
                      <StyledTableCellSm>
                        {row.frequency}
                      </StyledTableCellSm>
                      <StyledTableCellSm>{row.expires}</StyledTableCellSm>
                      <StyledTableCellSm>{row.amount}</StyledTableCellSm>
                      <StyledTableCellSm>{row.refills}</StyledTableCellSm>
                      <StyledTableCellSm>{row.generic ? "Yes" : "No"}</StyledTableCellSm>
                    </StyledTableRowSm>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

Medications.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default Medications;
