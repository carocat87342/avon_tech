import React, { useCallback, useEffect, useState } from "react";

import { Typography } from "@material-ui/core";

import usePatientContext from "../../../../../hooks/usePatientContext";
import PatientService from "../../../../../services/patient.service";

const BillingCard = () => {
  const [encounterBillings, setEncounterBillings] = useState([]);
  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id;

  const fetchEncountersBilling = useCallback(() => {
    PatientService.getEncountersBilling(patientId, encounterId)
      .then((response) => {
        setEncounterBillings(response.data);
      });
  }, [patientId, encounterId]);

  useEffect(() => {
    if (selectedEncounter) {
      fetchEncountersBilling();
    }
  }, [fetchEncountersBilling, selectedEncounter]);

  return (
    <>
      {
        encounterBillings.length
          ? encounterBillings.map((Billing) => (
            <Typography gutterBottom>{Billing.title}</Typography>
          ))
          : ""
      }
    </>
  );
};

export default BillingCard;
