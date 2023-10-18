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

import { StyledTableCellSm, StyledTableRowSm } from "../../../../../components/common/StyledTable";
import useDebounce from "../../../../../hooks/useDebounce";
import usePatientContext from "../../../../../hooks/usePatientContext";
import PatientService from "../../../../../services/patient.service";
import { NewDrugFormFields, GenericOptions } from "../../../../../static/encountersForm";
import { drugFrequencyCodeToLabel } from "../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  relativePosition: {
    position: "relative",
  },
  resultsContainer: {
    position: "absolute",
    top: 50,
    zIndex: 2,
    width: "100%",
    background: theme.palette.common.white,
    maxHeight: 150,
    overflow: "scroll",
  },
  cursorPointer: {
    cursor: "pointer",
  },
}));

const NewPrescription = (props) => {
  const { onClose } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const currentDate = new Date();
  const [drugSearchResults, setDrugSearchResults] = useState([]);
  const [drugFrequencies, setDrugFrequencies] = useState([]);
  const [recentSelections, setRecentSelections] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [formFields, setFormFields] = useState({
    type: "",
    drug_id: "",
    frequency: "",
    startDate: currentDate,
    expires: "",
    amount: "",
    refills: "",
    patientInstructions: "",
    pharmacyInstructions: "",
    generic: "1",
  });

  const debouncedSearchTerm = useDebounce(formFields.type, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const reqBody = {
        data: {
          text: debouncedSearchTerm,
        },
      };
      PatientService.searchEncountersPrescriptionsDrugs(reqBody)
        .then((res) => {
          setDrugSearchResults(res.data);
        });
    } else {
      setDrugSearchResults([]); // to clear search results dropdown
    }
  }, [debouncedSearchTerm]);

  const fetchRecentPrescriptions = useCallback(() => {
    PatientService.getEncountersPrescriptions(patientId, encounterId)
      .then((response) => {
        setRecentSelections(response.data);
      });
  }, [patientId, encounterId]);

  const fetchDrugFrequencies = useCallback(() => {
    PatientService.getEncountersPrescriptionsDrugsFrequencies(patientId, encounterId)
      .then((response) => {
        setDrugFrequencies(response.data);
      });
  }, [patientId, encounterId]);

  useEffect(() => {
    fetchRecentPrescriptions();
    fetchDrugFrequencies();
  }, [fetchRecentPrescriptions, fetchDrugFrequencies]);

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
      [name]: `${value.name} `,
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
      default:
        return <div />;
    }
  };

  const prepareRequestBodyParams = () => {
    const bodyParams = {
      drug_id: formFields.drug_id,
      drug_frequency_id: formFields.frequency,
      drug_strength_id: 2,
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
    if (selectedPrescription) {
      const reqBody = {
        data: prepareRequestBodyParams(),
      };
      PatientService.editEncountersPrescriptions(patientId, encounterId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          onClose();
        });
    } else {
      const reqBody = {
        data: prepareRequestBodyParams(),
      };
      PatientService.createEncountersPrescriptions(patientId, encounterId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          onClose();
        });
    }
    e.stopPropagation(); // to prevent encounters main form submission
  };

  const rowClickHandler = (row) => {
    setSelectedPrescription(row); // selected preescription saved for editing
    formFields.type = `${row.name} `;
    formFields.drug_id = row.id;
    formFields.frequency = row.drug_frequency_id;
    formFields.expires = row.expires;
    formFields.amount = row.amount;
    formFields.refills = row.refills;
    formFields.startDate = new Date(row.start_dt);
    formFields.patientInstructions = row.patient_instructions;
    formFields.pharmacyInstructions = row.pharmacy_instructions;
    setFormFields({ ...formFields });
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        New Drug
      </Typography>
      <Grid container>
        <Grid item lg={4} md={4} xs={12}>
          <form
            onSubmit={onFormSubmit}
            id="prescriptions-form"
          >
            <Grid
              item
              lg={10}
              md={10}
              xs={12}
              className={classes.relativePosition}
            >
              {NewDrugFormFields.map((item) => (
                <Box mb={1} key={item.id}>
                  {item.type === "date"
                    ? (
                      <KeyboardDatePicker
                        key={item.id}
                        margin="dense"
                        inputVariant="outlined"
                        id="date-picker-dialog"
                        label={item.label}
                        format="dd/MM/yyyy"
                        value={formFields.startDate}
                        onChange={handleDateChange}
                        fullWidth
                        required
                        minDate={undefined}
                        maxDate={undefined}
                      />
                    )
                    : (
                      <TextField
                        key={item.id}
                        label={item.label}
                        variant="outlined"
                        margin="dense"
                        name={item.name}
                        id={item.id}
                        type={item.type}
                        value={formFields[item.name]}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                        required
                        select={item.baseType === "select"}
                        inputProps={{
                          autoComplete: "off",
                        }}
                      >
                        {item.baseType === "select" && renderOptionsForDropdowns(item.label)}
                      </TextField>
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
                <Button variant="outlined" onClick={() => onClose()}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Typography variant="h5" gutterBottom>
            Recent selections, click to populate
          </Typography>
          <TableContainer>
            <Table size="small" aria-label="prescriptions-table">
              <TableHead>
                <TableRow>
                  <StyledTableCellSm>Drug and Type</StyledTableCellSm>
                  <StyledTableCellSm>Frequency</StyledTableCellSm>
                  <StyledTableCellSm>Expires</StyledTableCellSm>
                  <StyledTableCellSm>Amount</StyledTableCellSm>
                  <StyledTableCellSm>Refills</StyledTableCellSm>
                  <StyledTableCellSm>Generic</StyledTableCellSm>
                  <StyledTableCellSm>Patient Note</StyledTableCellSm>
                  <StyledTableCellSm>Pharmacy Note</StyledTableCellSm>
                  <StyledTableCellSm>Last Used</StyledTableCellSm>
                  <StyledTableCellSm>Count</StyledTableCellSm>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentSelections.length
                  ? recentSelections.map((row) => (
                    <StyledTableRowSm
                      key={row.created}
                      className={classes.cursorPointer}
                      onClick={() => rowClickHandler(row)}
                    >
                      <StyledTableCellSm>{row.name}</StyledTableCellSm>
                      <StyledTableCellSm>
                        {row.drug_frequency_id && drugFrequencyCodeToLabel(row.drug_frequency_id)}
                      </StyledTableCellSm>
                      <StyledTableCellSm>{row.expires}</StyledTableCellSm>
                      <StyledTableCellSm>{row.amount}</StyledTableCellSm>
                      <StyledTableCellSm>{row.refills}</StyledTableCellSm>
                      <StyledTableCellSm>{row.generic ? "Yes" : "No"}</StyledTableCellSm>
                      <StyledTableCellSm>{row.patient_instructions}</StyledTableCellSm>
                      <StyledTableCellSm>{row.pharmacy_instructions}</StyledTableCellSm>
                      <StyledTableCellSm>{row.name}</StyledTableCellSm>
                      <StyledTableCellSm>{row.name}</StyledTableCellSm>
                    </StyledTableRowSm>
                  ))
                  : (
                    <StyledTableRowSm>
                      <StyledTableCellSm colSpan={10}>
                        <Typography align="center" variant="body1">
                          No Records Found...
                        </Typography>
                      </StyledTableCellSm>
                    </StyledTableRowSm>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

NewPrescription.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewPrescription;
