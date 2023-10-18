import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import mergePatientService from "../../../../services/manage/mergePatient.service";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  mergeItems: {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    maxWidth: "100px",
  },
}));

export default function MergePatient() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [patientIdKeep, setPatientIdKeep] = useState("");
  const [patientIdDelete, setPatientIdDelete] = useState("");

  const onFormSubmit = () => {
    const formData = {
      data: {
        patient_id_to_keep: patientIdKeep,
        patient_id_to_delete: patientIdDelete,
      },
    };
    mergePatientService.mergePatient(formData).then((response) => {
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
      setPatientIdKeep("");
      setPatientIdDelete("");
    });
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Merge Patient
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used to merge patient account together
      </Typography>
      <div className={classes.mergeItems}>
        <TextField
          value={patientIdKeep}
          variant="outlined"
          margin="normal"
          id="patientId"
          label="Patient Id to keep"
          name="patientId"
          autoComplete="patientId"
          autoFocus
          onChange={(event) => setPatientIdKeep(event.target.value)}
          size="small"
        />
        <TextField
          value={patientIdDelete}
          variant="outlined"
          margin="normal"
          id="patientIdDelete"
          label="Patient Id to Delete"
          name="patientIdDelete"
          autoComplete="patientIdDelete"
          onChange={(event) => setPatientIdDelete(event.target.value)}
          size="small"
        />

        <Button
          disabled={!patientIdKeep || !patientIdDelete}
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => onFormSubmit()}
          size="small"
        >
          Merge
        </Button>
      </div>
    </div>
  );
}
