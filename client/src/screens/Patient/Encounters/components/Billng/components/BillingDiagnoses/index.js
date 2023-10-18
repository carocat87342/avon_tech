import React, { useState, useEffect, useCallback } from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import usePatientContext from "../../../../../../../hooks/usePatientContext";
import PatientService from "../../../../../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  ml1: {
    marginLeft: theme.spacing(1),
  },
}));

const BillingDiagnoses = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const [billingDiagnoses, setBillingDiagnoses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBillingDiagnoses = useCallback(() => {
    PatientService.geEncountersBillingDiagnoses(patientId, encounterId).then((response) => {
      setBillingDiagnoses(response.data);
      setIsLoading(false);
    });
  }, [patientId, encounterId]);

  useEffect(() => {
    fetchBillingDiagnoses();
  }, [fetchBillingDiagnoses]);

  return (
    <>
      {billingDiagnoses.length
        ? billingDiagnoses.map((item) => (
          <Typography
            gutterBottom
            variant="body1"
            key={`${item.id}_${Math.random()}`}
          >
            {item.name}
            <span className={classes.ml1}>
              {`(${item.id})`}
            </span>
          </Typography>
        ))
        : (
          <Typography gutterBottom variant="body1">
            {isLoading ? "Loading..." : "No Diagnoses found..."}
          </Typography>
        )}
    </>
  );
};

export default BillingDiagnoses;
