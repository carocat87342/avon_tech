import React, { useCallback, useEffect, useState } from "react";

import { Typography } from "@material-ui/core";

import usePatientContext from "../../../../../hooks/usePatientContext";
import PatientService from "../../../../../services/patient.service";

const PlanCard = () => {
  const [encounterPlans, setEncounterPlans] = useState([]);
  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id;

  const fetchEncountersPlan = useCallback(() => {
    PatientService.getEncountersPlan(patientId, encounterId)
      .then((response) => {
        setEncounterPlans(response.data);
      });
  }, [patientId, encounterId]);

  useEffect(() => {
    if (selectedEncounter) {
      fetchEncountersPlan();
    }
  }, [fetchEncountersPlan, selectedEncounter]);

  return (
    <>
      {
        encounterPlans.length
          ? encounterPlans.map((plan) => (
            <Typography key={`${plan.type}_${plan.name}`} gutterBottom>{plan.name}</Typography>
          ))
          : ""
      }
    </>
  );
};

export default PlanCard;
