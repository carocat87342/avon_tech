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

const RequestedLabs = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const [requestedLabs, setRequestedLabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequestedLabs = useCallback(() => {
    PatientService.geEncountersRequestedLabs(patientId, encounterId).then((response) => {
      setRequestedLabs(response.data);
      setIsLoading(false);
    });
  }, [patientId, encounterId]);

  useEffect(() => {
    fetchRequestedLabs();
  }, [fetchRequestedLabs]);

  return (
    <>
      {requestedLabs.length
        ? requestedLabs.map((item) => (
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
            {isLoading ? "Loading..." : "No Labs found..."}
          </Typography>
        )}
    </>
  );
};

export default RequestedLabs;
