import React from "react";

import { Grid, Typography } from "@material-ui/core";

import UltraWellnessLogo from "../../../../../assets/client/c1_logo.png";

const LetterHead = () => (
  <Grid container justify="space-between">
    <Grid item md={4}>
      <img
        alt="ultrawellness-logo"
        src={UltraWellnessLogo}
      />
    </Grid>
    <Grid item md={2}>
      <Typography gutterBottom>UltraWellness Center</Typography>
      <Typography gutterBottom>Mark Hyman MD</Typography>
      <Typography gutterBottom>55 PittsField Rd # 9</Typography>
      <Typography gutterBottom>DEA #A 123456789</Typography>
      <Typography gutterBottom>NPI # 123456789</Typography>
      <Typography gutterBottom>Lenox, MA 01240</Typography>
      <Typography gutterBottom>Phone (413) 637-9991</Typography>
      <Typography gutterBottom>Fax (413) 637-9991</Typography>
    </Grid>
  </Grid>
);

export default LetterHead;
