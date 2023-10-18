import React, { useRef } from "react";

import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useReactToPrint } from "react-to-print";

import FaxTo from "../FaxTo";
import HeadingDate from "../HeadingDate";
import LetterHead from "../LetterHead";
import PatientInformation from "../PatientInformation";
import PatientInsurance from "../PatientInsurance";
import Prescriptions from "./components/Prescriptions";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 14,
  },
  button: {
    minWidth: 100,
    "& a": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  borderSection: {
    border: "1px solid #aaa",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    minHeight: 270,
    position: "relative",
  },
}));

const FaxPrescription = () => {
  const classes = useStyles();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-window",
  });

  return (
    <>
      <Grid item lg={6}>
        <Grid container spacing={2} component={Box} mb={2}>
          <Grid item lg={6}>
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Pharmacy"
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Fax To"
            />
          </Grid>
        </Grid>


        <Grid container justify="space-between" className={classes.mb2}>
          <Button
            className={classes.button}
            variant="outlined"
          >
            Send Fax
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
          >
            Download
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={handlePrint}
          >
            Print
          </Button>
        </Grid>
      </Grid>

      <Grid
        className={classes.borderSection}
        ref={componentRef}
      >
        <LetterHead />
        <HeadingDate
          heading="Fax Prescription"
        />

        <Grid container>
          <Grid item lg={4} md={4}>
            <Typography variant="h4" gutterBottom>To</Typography>
            <FaxTo />
          </Grid>
          <Grid item lg={4} md={4}>
            <Typography variant="h4" gutterBottom>Patient Information</Typography>
            <PatientInformation />
          </Grid>
          <Grid item lg={4} md={4}>
            <Typography variant="h4" gutterBottom>Patient Insurance</Typography>
            <PatientInsurance />
          </Grid>
        </Grid>

        <Box mb={3} mt={3}>
          <Prescriptions />
        </Box>

        <Box mt={5}>
          <TextField value="Mark Hyman MD" disabled />
          <Typography color="textSecondary" variant="body2">Signature</Typography>
        </Box>
      </Grid>
    </>
  );
};

export default FaxPrescription;
