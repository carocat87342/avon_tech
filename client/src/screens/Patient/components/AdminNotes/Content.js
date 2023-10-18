import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import usePatientContext from "../../../../hooks/usePatientContext";

const useStyles = makeStyles(() => ({
  inputRow: {
    marginBottom: 0,
  },
  text12: {
    fontSize: 12,
    whiteSpace: "pre-line",
  },
}));

const AdminNotesContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { admin_note } = state.patientInfo.data;

  return (
    <Grid className={classes.inputRow}>
      <Typography
        variant="body1"
        className={classes.text12}
        color="textPrimary"
      >
        {admin_note}
      </Typography>
    </Grid>
  );
};

export default AdminNotesContent;
