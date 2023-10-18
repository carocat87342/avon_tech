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

import useAuth from "../../../hooks/useAuth";
import usePatientContext from "../../../hooks/usePatientContext";
import {
  resetEncounter,
  toggleEncountersDialog,
} from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";
import { EncountersFormFields } from "../../../static/encountersForm";
import {
  FirstColumnPatientCards,
  ThirdColumnPatientCards,
  FourthColumnPatientCards,
} from "../../../static/patient";
import { encounterTypeToLetterConversion, encounterLetterToTypeConversion } from "../../../utils/helpers";
import { AdminNotesCardContent } from "../components/AdminNotes";
import { AllergiesCardContent } from "../components/Allergies";
import { PatientCardContent } from "../components/BasicInfo";
import { BillingCardContent } from "../components/Billing";
import { DiagnosesCardContent } from "../components/Diagnoses";
import DiagnosesSelectList from "../components/Diagnoses/DiagnosesSelectList";
import { DocumentsCardContent } from "../components/Documents";
import { HandoutsCardContent } from "../components/Handouts";
import FormCardContent from "../Form/content";
import MedicalNotesCardContent from "../MedicalNotes/content";
import MedicationsCardContent from "../Medications/content";
import MessagesCardContent from "../Messages/content";
import RequisitionsCardContent from "../Requisitions/content";
import TestsCardContent from "../Tests/content";
import BillingCard from "./components/BillingCard";
import Card from "./components/Card";
import ClockTimer from "./components/ClockTimer";
import PlanCard from "./components/PlanCard";

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

  const { user } = useAuth();
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

  const handleInputChnage = (e) => {
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
          encounter_type: encounterLetterToTypeConversion(formFields.encounter_type),
          type_id: formFields.encounter_type,
          name: formFields.name,
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

  const renderCardData = (value) => {
    switch (value) {
      case "Patient":
        return <PatientCardContent />;
      case "Admin Notes":
        return <AdminNotesCardContent />;
      case "Forms":
        return <FormCardContent />;
      case "Billing":
        return <BillingCardContent />;
      case "Allergies":
        return <AllergiesCardContent />;
      case "Medical Notes":
        return <MedicalNotesCardContent />;
      case "Handouts":
        return <HandoutsCardContent />;
      case "Messages":
        return <MessagesCardContent />;
      case "Medications":
        return <MedicationsCardContent />;
      case "Diagnoses":
        return <DiagnosesCardContent />;
      case "Requisitions":
        return <RequisitionsCardContent />;
      default:
        return <div />;
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid
          item
          lg={2}
          md={2}
        >
          {FirstColumnPatientCards.map((item) => (
            <Grid key={item.title}>
              <Card
                title={item.title}
                data={renderCardData(item.title)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
        >
          <>
            <Typography variant="h3" color="textSecondary">
              Encounters Form
            </Typography>

            <form id="encounters-form" onSubmit={onFormSubmit}>
              <Grid container spacing={2} alignItems="center">
                {EncountersFormFields.map((item) => (
                  <Grid item lg={3} key={item.label}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item lg={3} xs={4}>
                        <label htmlFor={item.name} variant="h4" color="textSecondary">
                          {item.label}
                        </label>
                      </Grid>
                      <Grid item lg={9} xs={8}>
                        {item.baseType === "input" ? (
                          <TextField
                            variant="standard"
                            name={item.name}
                            id={item.id}
                            type={item.type}
                            value={formFields[item.name]}
                            fullWidth
                            onChange={(e) => handleInputChnage(e)}
                            required
                          />
                        ) : (
                          <TextField
                            select
                            placeholder={item.label}
                            id={item.id}
                            name={item.name}
                            value={formFields[item.name]}
                            fullWidth
                            onChange={(e) => handleInputChnage(e)}
                            required
                          >
                            {item.options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}

                <Grid item lg={2} className={classes.dateInput}>
                  <KeyboardDatePicker
                    key="date"
                    margin="dense"
                    inputVariant="standard"
                    name="date"
                    id="date"
                    format="dd/MM/yyyy"
                    value={formFields.date}
                    onChange={handleDateChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <Grid
                    container
                    alignItems="center"
                    className={classes.formInput}
                  >
                    <Grid item lg={12} xs={10}>
                      <ClockTimer />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item lg={9} md={8} xs={12}>
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
                        onChange={(e) => handleInputChnage(e)}
                        multiline
                        rows={15}
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
                        onChange={(e) => handleInputChnage(e)}
                        multiline
                        rows={15}
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={3} md={4} xs={12}>
                  {/* <CardsList /> */}
                  <Card
                    title="Diagnose"
                    data={<DiagnosesSelectList />}
                    icon
                  />
                  <Card
                    title="Plan"
                    data={<PlanCard />}
                    icon
                  />
                  <Card
                    title="Billing"
                    data={<BillingCard />}
                    icon
                  />

                  <Grid className={classes.card}>
                    <Grid className={classes.btnsContainer} container justify="space-between">
                      <Grid item xs={5}>
                        <Button
                          fullWidth
                          variant="outlined"
                          type="submit"
                          form="encounters-form"
                          color="primary"
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid item xs={5}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => dispatch(toggleEncountersDialog())}
                        >
                          Exit
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography gutterBottom className={classes.pageCredit}>
                      <span>Created:</span>
                      {" "}
                      {moment().format("MMM D YYYY hh:mm A")}
                    </Typography>
                    <Typography gutterBottom className={classes.pageCredit}>
                      <span>Created By:</span>
                      {" "}
                      {!!user && `${user.firstname} ${user.lastname}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </>
        </Grid>

        <Grid
          item
          lg={2}
          md={2}
        >
          {ThirdColumnPatientCards.map((item) => (
            <Grid key={item.title}>
              <Card
                title={item.title}
                data={renderCardData(item.title)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
        >
          {FourthColumnPatientCards.map((item) => (
            <Grid key={item.title}>
              <Card
                title={item.title}
                data={renderCardData(item.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={6} sm={12} className={classes.w100}>
          <Card
            title="Documents"
            data={(
              <DocumentsCardContent
                reloadData={() => { }}
                actionsEnable={false}
              />
            )}
          />
        </Grid>
        <Grid item md={6} sm={12} className={classes.w100}>
          <Card
            title="Tests"
            data={<TestsCardContent />}
          />
        </Grid>
      </Grid>
    </>
  );
};

Encounters.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default Encounters;
