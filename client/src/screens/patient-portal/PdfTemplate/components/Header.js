import React from "react";

import { Typography, Grid, makeStyles } from "@material-ui/core";

import colors from "../../../../theme/colors";

const useStyles = makeStyles((theme) => ({
  questDiagnosticHeading: {
    color: colors.headingBlue,
  },
  pscHoldOrderText: {
    color: theme.palette.warning.main,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between">
      <Grid item>
        <img src="https://content.ultalabtests.com/static/images/Logo.svg" alt="logo" />
      </Grid>
      <Grid item>
        <Typography variant="h5" className={classes.questDiagnosticHeading}>
          Quest Diagnostics Incorporated
        </Typography>
        <Typography variant="h1" className={classes.pscHoldOrderText}>
          PSC HOLD ORDER
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
