import React, { useRef } from "react";

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useReactToPrint } from "react-to-print";

import BillingDiagnoses from "../Billng/components/BillingDiagnoses";
import FaxTo from "../FaxTo";
import HeadingDate from "../HeadingDate";
import LetterHead from "../LetterHead";
import PatientInformation from "../PatientInformation";
import PatientInsurance from "../PatientInsurance";

const useStyles = makeStyles((theme) => ({
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

const FaxLab = () => {
  const classes = useStyles();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-window",
  });

  return (
    <>
      <Grid container spacing={2} alignItems="center" className={classes.mb2}>
        <Grid item lg={6}>
          <Grid item lg={10}>
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              label="Fax To"
            />
          </Grid>
        </Grid>
        <Grid item lg={6}>
          <Grid container justify="space-between">
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
      </Grid>

      <Grid
        className={classes.borderSection}
        ref={componentRef}
      >
        <LetterHead />
        <HeadingDate
          heading="Lab Requisition"
        />

        <Grid container>
          <Grid item md={4}>
            <Typography variant="h4" gutterBottom>To</Typography>
            <FaxTo />
          </Grid>
          <Grid item md={4}>
            <Typography variant="h4" gutterBottom>Patient Information</Typography>
            <PatientInformation />
          </Grid>
          <Grid item md={4}>
            <Typography variant="h4" gutterBottom>Patient Insurance</Typography>
            <PatientInsurance />
          </Grid>
        </Grid>

        <Box mt={2} mb={2}>
          <Typography variant="h4" gutterBottom>Diagnoses</Typography>
          <BillingDiagnoses />
        </Box>

        <Box mt={2} mb={2}>
          <Typography variant="h4" gutterBottom>Requested Labs</Typography>
        </Box>

        <Box mt={5}>
          <TextField value="Mark Hyman MD" disabled />
          <Typography color="textSecondary" variant="body2">Signature</Typography>
        </Box>
      </Grid>
    </>
  );
};

export default FaxLab;
