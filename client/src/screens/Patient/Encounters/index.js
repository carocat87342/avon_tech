import React, { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import usePatientContext from "../../../hooks/usePatientContext";
import {
  resetEncounter,
  toggleEncountersDialog,
} from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";
import { EncountersFormFields } from "../../../static/encountersForm";
import { encounterTypeToLetterConversion } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  btnsContainer: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  formInput: {
    margin: theme.spacing(1, 0),
  },
  card: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: 4,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  dateInput: {
    "& button": {
      padding: 4,
    },
  },
  w100: {
    width: "100%",
  },
  pageCredit: {
    fontSize: "11px",
    "& span": {
      fontWeight: 600,
    },
  },
}));

const Encounters = (props) => {
  const classes = useStyles();
  const currentDate = new Date();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { reloadData } = props;
  const [formFields, setFormFields] = useState({
    title: "",
    encounter_type: "",
    name: "",
    date: currentDate,
    notes: "",
    treatment: "",
  });

  const { patientId } = state;
  const encounter = state.encounters.selectedEncounter;

  const updateFields = () => {
    formFields.title = encounter.title;
    formFields.encounter_type = encounterTypeToLetterConversion(encounter.encounter_type);
    formFields.name = encounter.name;
    formFields.date = moment(encounter.dt).format("YYYY-MM-DD");
    formFields.notes = encounter.notes;
    formFields.treatment = encounter.treatment;
    setFormFields({ ...formFields });
  };

  useEffect(() => {
    if (encounter) {
      updateFields();
    }
    return () => !!encounter && dispatch(resetEncounter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounter]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const name = "date";
    setFormFields({
      ...formFields,
      [name]: date,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (encounter) {
      const encounterId = encounter.id;
      const reqBody = {
        data: {
          dt: formFields.date,
          title: formFields.title,
          // encounter_type: encounterLetterToTypeConversion(formFields.encounter_type),
          type_id: formFields.encounter_type,
          // name: formFields.name,
          notes: formFields.notes,
          treatment: formFields.treatment,
        },
      };
      PatientService.updateEncounters(patientId, encounterId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(toggleEncountersDialog());
        });
    } else {
      const reqBody = {
        data: {
          dt: formFields.date,
          title: formFields.title,
          type_id: formFields.encounter_type,
          name: formFields.name,
          notes: formFields.notes,
          treatment: formFields.treatment,
        },
      };
      PatientService.createEncounter(patientId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(toggleEncountersDialog());
        });
    }
  };

  return (
    <>
      <>
        <form id="encounters-form" onSubmit={onFormSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item lg={3} className={classes.dateInput}>
              <KeyboardDatePicker
                key="date"
                margin="dense"
                inputVariant="outlined"
                name="date"
                id="date"
                format="MMM dd yyyy"
                value={formFields.date}
                onChange={handleDateChange}
                fullWidth
                required
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item lg={3}>
              <TextField
                select
                variant="outlined"
                size="small"
                label={EncountersFormFields.typeField.label}
                id={EncountersFormFields.typeField.id}
                name={EncountersFormFields.typeField.name}
                value={formFields[EncountersFormFields.typeField.name]}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                required
              >
                {EncountersFormFields.typeField.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={6}>
              <TextField
                variant="outlined"
                size="small"
                label={EncountersFormFields.titleField.label}
                name={EncountersFormFields.titleField.name}
                id={EncountersFormFields.titleField.id}
                type={EncountersFormFields.titleField.type}
                value={formFields[EncountersFormFields.titleField.name]}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                required
              />
            </Grid>
          </Grid>

          <Grid className={classes.formInput}>
            <Grid item lg={6}>
              <Typography gutterBottom variant="h6" color="textPrimary">
                Internal Notes (Not Visible to Patients)
              </Typography>
            </Grid>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                name="notes"
                id="notes"
                type="text"
                fullWidth
                value={formFields.notes}
                onChange={(e) => handleInputChange(e)}
                multiline
                rows={12}
                required
              />
            </Grid>
          </Grid>

          <Grid className={classes.formInput}>
            <Grid item lg={6}>
              <Typography gutterBottom variant="h6" color="textPrimary">
                Treatment Plan (Visible to Patients)
              </Typography>
            </Grid>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                name="treatment"
                id="treatment"
                type="text"
                fullWidth
                value={formFields.treatment}
                onChange={(e) => handleInputChange(e)}
                multiline
                rows={12}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="outlined"
          >
            Save
          </Button>
        </form>
      </>
    </>
  );
};

Encounters.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default Encounters;
