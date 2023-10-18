import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import usePatientContext from "../../../hooks/usePatientContext";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(1),
  },
  text12: {
    fontSize: 12,
    whiteSpace: "pre-line",
  },
}));

const MedicalNotesContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { medical_note } = state.patientInfo.data;

  return (
    <Typography className={classes.text12} color="textPrimary">
      {medical_note}
    </Typography>
  );
};

export default MedicalNotesContent;
