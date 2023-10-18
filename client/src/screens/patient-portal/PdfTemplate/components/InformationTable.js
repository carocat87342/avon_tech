/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import { Typography, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";

import { formatPdfDate } from "../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  infoSpace: {
    lineHeight: 1.3,
  },
  tableHeading: {
    border: "1px solid black",
    padding: "20px 5px 20px 5px",
  },
  tableBody: {
    border: "1px solid black",
    padding: "20px 5px 20px 5px",
  },
  fontWeight800: {
    fontWeight: 800,
  },
  fontWeight1000: {
    fontWeight: 1000,
  },
  fontSize14: {
    fontSize: 14,
  },
  dataInformationGrid: {
    paddingTop: 5,
  },
  patNameGrid: {
    marginLeft: 4,
  },
  billTypeTypo: {
    marginLeft: 10,
  },
  clientTypo: {
    margin: theme.spacing(0.5, 0),
  },
  clientTypoHeading: {
    fontSize: 18,
  },
  genderTextSize: {
    fontSize: 12,
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
}));

const InformationTable = (props) => {
  const classes = useStyles();
  const { testProfileInfo } = props;
  return (
    <>
      <Grid container className={classes.mt5}>
        <Grid
          item
          container
          justify="flex-start"
          direction="column"
          xs={6}
          className={classes.tableHeading}
        >
          <Typography variant="h5">Ordering Physician</Typography>
          <Typography className={clsx(classes.ml5, classes.mt10)}>
            <span className={clsx(classes.fontWeight800, classes.fontSize14)}>NPI</span>
            :
            <span className={classes.ml15}>1346417086</span>
            <span className={classes.ml10}> Bauer,</span>
            <span> Michael</span>
          </Typography>
        </Grid>
        <Grid
          item
          container
          justify="center"
          direction="column"
          xs={6}
          className={classes.tableHeading}
        >
          <Typography variant="h5">Data Information</Typography>
          <Grid container className={clsx(classes.ml5, classes.dataInformationGrid)}>
            <Grid item>
              <Typography component="h1" variant="h5">
                <p className={clsx(classes.fontWeight800, classes.fontSize14)}>
                  Pat ID #:
                  <span className={classes.ml3}>{testProfileInfo.patient_id}</span>
                </p>
              </Typography>
              <Typography variant="h5">
                <p className={clsx(classes.fontWeight800, classes.fontSize14)}>
                  DOB:
                  <span className={classes.ml3}>{formatPdfDate(testProfileInfo.dob)}</span>
                </p>
              </Typography>
            </Grid>
            <Grid item className={classes.patNameGrid}>
              <Typography variant="h5">
                <p className={clsx(classes.fontWeight800, classes.fontSize14)}>
                  <span className={classes.ml2}>Pat Name: </span>
                  {" "}
                  <span className={classes.ml2}>{testProfileInfo.firstname}</span>
                  ,
                  <span className={classes.ml4}>{testProfileInfo.lastname}</span>
                </p>
              </Typography>
              <Grid container alignItems="flex-start" justify="space-between">
                <Typography variant="h5" className={classes.profileGenderTypo}>
                  <span className={clsx(classes.fontWeight800, classes.fontSize14)}>Sex:</span>
                  <span className={clsx(classes.ml4, classes.genderTextSize)}>{testProfileInfo.gender}</span>
                  <span className={classes.ml5} />
                </Typography>
                <Typography variant="h5">
                  <p className={clsx(classes.fontWeight800, classes.fontSize14)}>
                    Order #:
                    <span className={classes.ml4}>{testProfileInfo.ulta_order}</span>
                  </p>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* table body */}

      <Grid container>
        <Grid item xs={6} className={classes.tableBody}>
          <Grid container>
            <Typography variant="h5">Responsible Party</Typography>
            <Typography variant="h5" className={classes.billTypeTypo}>
              <span className={clsx(classes.fontWeight800, classes.fontSize14)}>Bill Type: </span>
              Client
            </Typography>
          </Grid>
          <Typography className={clsx(classes.infoSpace, classes.clientTypo)} variant="h4">
            <span className={clsx(classes.fontWeight1000, classes.clientTypoHeading)}>Client #:</span>
            <span className={classes.ml4}>97512437</span>

          </Typography>
          <Typography className={classes.infoSpace}>Ultra Lab Tests, LLC</Typography>
          <Typography className={classes.infoSpace}>9237 E Via de Ventura, Suite 220 </Typography>
          <Typography className={classes.infoSpace}>Scottsdale, AZ 85258 </Typography>
          <a target="_blank" href="http://ultralabtests.com">
            UltraLabTests.com
          </a>
        </Grid>

        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          xs={6}
          className={classes.tableBody}
        >
          <Typography variant="h4">ClIENT BILL ONLY</Typography>
          <Typography variant="h4">NO PATIENT</Typography>
          <Typography variant="h4">OR</Typography>
          <Typography variant="h4">THIRD PARTY BILLING</Typography>
          <Typography variant="h4">ON THIS ACCOUNT</Typography>
        </Grid>
      </Grid>
    </>
  );
};

InformationTable.propTypes = {
  testProfileInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default InformationTable;
