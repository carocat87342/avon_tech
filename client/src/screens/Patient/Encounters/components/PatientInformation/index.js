import React from "react";

import { Typography } from "@material-ui/core";

import usePatientContext from "../../../../../hooks/usePatientContext";

const PatientInformation = () => {
  const { state } = usePatientContext();
  const { patientInfo } = state;
  const patientData = patientInfo?.data || {};

  return (
    <>
      <Typography gutterBottom>
        {`${patientData.firstname} ${patientData.lastname}`}
      </Typography>
      <Typography gutterBottom>
        {patientData.address || "-"}
      </Typography>
      <Typography gutterBottom>
        {`${patientData.city || ""} ${patientData.state || ""} ${patientData.postal || ""}`}
      </Typography>
      <Typography gutterBottom>
        DOB
        {patientData.dob}
      </Typography>
      <Typography gutterBottom>
        Phone
        {patientData.phone_cell}
      </Typography>
    </>
  );
};

export default PatientInformation;
