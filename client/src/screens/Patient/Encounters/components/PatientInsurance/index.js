import React from "react";

import { Typography } from "@material-ui/core";

const PatientInformation = () => (
  <>
    <Typography gutterBottom>
      ID #: 123456789
    </Typography>
    <Typography gutterBottom>
      Insurance Phone:
      (925) 676-4040
    </Typography>
    <Typography gutterBottom>
      Bill To:
      Patient
    </Typography>
  </>
);

export default PatientInformation;
