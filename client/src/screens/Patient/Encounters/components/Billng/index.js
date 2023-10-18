import React, { useState, useEffect, useCallback } from "react";

import {
  Box, Button, Grid, Typography, TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import usePatientContext from "../../../../../hooks/usePatientContext";
import PatientService from "../../../../../services/patient.service";
import HeadingDate from "../HeadingDate";
import LetterHead from "../LetterHead";
import PatientInformation from "../PatientInformation";
import BillingDiagnoses from "./components/BillingDiagnoses";
import BillingPaymentDialog from "./components/BillingPaymentDialog";
import BillingPayment from "./components/BillingPayments";
import BillingProcedures from "./components/BillingProcedures";


const useStyles = makeStyles((theme) => ({
  minWidth100: {
    minWidth: 100,
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
  text: {
    fontSize: 16,
  },
}));

const BillingDialogContent = (props) => {
  const { onClose } = props;
  const classes = useStyles();

  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const [showPayment, setShowPayment] = useState(false);
  const [billingPayments, setBillingPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBillingPayments = useCallback(() => {
    PatientService.geEncountersBillingPayments(patientId, encounterId).then((response) => {
      setBillingPayments(response.data);
      setIsLoading(false);
    });
  }, [patientId, encounterId]);

  useEffect(() => {
    fetchBillingPayments();
  }, [fetchBillingPayments]);

  const togglePaymentDialog = () => {
    setShowPayment((prevState) => !prevState);
  };

  return (
    <>
      <BillingPaymentDialog
        open={showPayment}
        onClose={togglePaymentDialog}
        reloadData={fetchBillingPayments}
      />
      <Grid
        container
        justify="space-between"
        className={classes.mb2}
      >
        <Button
          variant="outlined"
          className={classes.minWidth100}
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          className={classes.minWidth100}
          onClick={() => togglePaymentDialog()}
        >
          Payment
        </Button>
        <Button
          variant="outlined"
          className={classes.minWidth100}
        >
          Save
        </Button>
      </Grid>
      <Grid className={classes.borderSection}>
        <LetterHead />
        <HeadingDate
          heading="Superbill"
        />

        <Grid container>
          <Grid item md={4}>
            <Typography variant="h4" gutterBottom>Patient Information</Typography>
            <PatientInformation />
          </Grid>
          <Grid item md={4}>
            <Typography variant="h4" gutterBottom>Diagnoses</Typography>
            <BillingDiagnoses />
          </Grid>
        </Grid>

        <Box mb={2} mt={2}>
          <BillingProcedures />
        </Box>

        <Box mb={2} mt={2}>
          <Typography variant="h4" gutterBottom>
            Total Amount:
            {" "}
            <span className={classes.text}>$100.00</span>
          </Typography>
        </Box>

        <Box mb={2} mt={2}>
          <Typography variant="h4" gutterBottom>Payment</Typography>
          <BillingPayment
            data={billingPayments}
            isLoading={isLoading}
          />
        </Box>

        <Box mt={5}>
          <TextField value="Mark Hyman MD" disabled />
          <Typography color="textSecondary" variant="body2">Signature</Typography>
        </Box>
      </Grid>
    </>
  );
};

BillingDialogContent.defaultProps = {
  onClose: () => { },
};

BillingDialogContent.propTypes = {
  onClose: PropTypes.func,
};

export default BillingDialogContent;
