import React from "react";

import { Typography, Grid, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { formatPhoneNumber } from "../../../../utils/helpers";

const useStyles = makeStyles(() => ({
  clientAndPatientInfo: {
    marginTop: 20,
  },
  infoSpace: {
    lineHeight: 1.2,
  },
  patientInformationGridItem: {
    alignSelf: "flex-start",
  },
  mt5: {
    marginTop: 5,
  },
  ml5: {
    marginLeft: 5,
  },
  mt10: {
    marginTop: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  ml10: {
    marginLeft: 10,
  },
  ml1: {
    marginLeft: 1,
  },
  ml2: {
    marginLeft: 2,
  },
  ml3: {
    marginLeft: 3,
  },
  ml4: {
    marginLeft: 4,
  },
  mt2: {
    marginTop: 2,
  },

}));

const PatientInformation = (props) => {
  const classes = useStyles();
  const { testProfileInfo } = props;
  return (
    <Grid container justify="space-between" className={classes.clientAndPatientInfo}>
      <Grid item xs={8}>
        <Typography className={classes.infoSpace}>
          Client
          <span className={classes.ml4}>#:</span>
          {" "}
          <span>97512437</span>
        </Typography>
        <Typography className={classes.infoSpace}>Ultra Lab Tests, LLC</Typography>
        <Typography className={classes.infoSpace}>9237 E Via de Ventura, Suite 220 </Typography>
        <Typography className={classes.infoSpace}>Scottsdale, AZ 85258 UltraLabTests.com </Typography>
      </Grid>
      <Grid item xs={4} className={classes.patientInformationGridItem}>
        <Typography className={classes.infoSpace}>Patient Information </Typography>
        <Typography className={classes.infoSpace}>
          {testProfileInfo.firstname}
          ,
          {" "}
          {testProfileInfo.lastname}
        </Typography>
        <Typography className={classes.infoSpace}>
          {" "}
          {testProfileInfo.address}
          {" "}
        </Typography>
        <Typography className={classes.infoSpace}>
          {testProfileInfo.city}
          ,
          {" "}
          {testProfileInfo.state}
          {" "}
          {testProfileInfo.postal}
        </Typography>
        <Typography className={classes.infoSpace}>
          Phone:
          {" "}
          {formatPhoneNumber(testProfileInfo?.phone_home)?.replaceAll(" ", "-")}
        </Typography>
      </Grid>
    </Grid>
  );
};

PatientInformation.propTypes = {
  testProfileInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PatientInformation;
