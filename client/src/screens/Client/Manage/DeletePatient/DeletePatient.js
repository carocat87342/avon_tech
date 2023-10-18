import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import deletePatientService from "../../../../services/manage/deletePatient.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  deleteFields: {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
  },
  delete: {
    maxWidth: "100px",
  },
}));

export default function DeletePatient() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [patientId, setPatientId] = useState("");

  const onFormSubmit = () => {
    deletePatientService.deletePatient(patientId).then((response) => {
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
      setPatientId("");
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={10} direction="column">
        <Grid item xs={12} sm={6}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Patient Delete
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used to delete patient
          </Typography>
          <div className={classes.deleteFields}>
            <TextField
              value={patientId}
              variant="outlined"
              margin="normal"
              id="patientId"
              label="Patient Id"
              name="patientId"
              autoComplete="patientId"
              autoFocus
              onChange={(event) => setPatientId(event.target.value)}
              size="small"
            />
            <Button
              disabled={!patientId}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.delete}
              size="small"
              onClick={() => onFormSubmit()}
            >
              Delete
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
