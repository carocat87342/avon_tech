import React, { useState, useEffect, useCallback } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import usePatientContext from "../../../../../../../hooks/usePatientContext";
import PatientService from "../../../../../../../services/patient.service";
import { drugFrequencyCodeToLabel } from "../../../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  ml1: {
    marginLeft: theme.spacing(1),
  },
  label: {
    fontWeight: 600,
  },
  text: {
    fontSize: 14,
  },
}));

const Prescriptions = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrescriptions = useCallback(() => {
    PatientService.getEncountersPrescriptions(patientId, encounterId).then((response) => {
      setPrescriptions(response.data);
      setIsLoading(false);
    });
  }, [patientId, encounterId]);


  useEffect(() => {
    fetchPrescriptions();
  }, [fetchPrescriptions]);

  return (
    <>
      {prescriptions.length
        ? prescriptions.map((item) => (
          <Grid
            item
            md={6}
            key={`${item.id}_${Math.random()}`}
          >
            <Typography
              gutterBottom
              variant="body1"
            >
              <span className={classes.label}>
                Prescriptions:
              </span>
              <span className={`${classes.ml1} ${classes.text}`}>
                {item.name}
              </span>
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
            >
              <span className={classes.label}>
                Frequency:
              </span>
              <span className={`${classes.ml1} ${classes.text}`}>
                {item.drug_frequency_id && drugFrequencyCodeToLabel(item.drug_frequency_id)}
              </span>
            </Typography>
            <Grid container>
              <Grid item lg={4}>
                <Typography
                  gutterBottom
                  variant="body1"
                >
                  <span className={classes.label}>
                    Start:
                  </span>
                  <span className={`${classes.ml1} ${classes.text}`}>
                    {moment(item.start_dt).format("MMM D YYYY")}
                  </span>
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography
                  gutterBottom
                  variant="body1"
                >
                  <span className={classes.label}>
                    Expires:
                  </span>
                  <span className={`${classes.ml1} ${classes.text}`}>
                    {item.expires}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={4}>
                <Typography
                  gutterBottom
                  variant="body1"
                >
                  <span className={classes.label}>
                    Amount:
                  </span>
                  <span className={`${classes.ml1} ${classes.text}`}>
                    $
                    {item.amount}
                  </span>
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography
                  gutterBottom
                  variant="body1"
                >
                  <span className={classes.label}>
                    Refills:
                  </span>
                  <span className={`${classes.ml1} ${classes.text}`}>
                    {item.refills}
                  </span>
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography
                  gutterBottom
                  variant="body1"
                >
                  <span className={classes.label}>
                    Generic OK:
                  </span>
                  <span className={`${classes.ml1} ${classes.text}`}>
                    {item.generic ? "Yes" : "No"}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Typography
              gutterBottom
              variant="body1"
            >
              <span className={classes.label}>
                Patient Notes:
              </span>
              <span className={`${classes.ml1} ${classes.text}`}>
                {item.patient_instructions}
              </span>
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
            >
              <span className={classes.label}>
                Pharmacist Notes:
              </span>
              <span className={`${classes.ml1} ${classes.text}`}>
                {item.pharmacy_instructions}
              </span>
            </Typography>
          </Grid>
        ))
        : (
          <Typography gutterBottom variant="body1">
            {isLoading ? "Loading..." : "No Prescriptions found..."}
          </Typography>
        )}
    </>
  );
};

export default Prescriptions;
