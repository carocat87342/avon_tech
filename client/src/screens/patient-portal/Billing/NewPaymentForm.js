import React, { useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../components/Dialog";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
    marginBottom: theme.spacing(2),
  },
  buttonsContainer: {
    margin: theme.spacing(3, 0),
  },
}));

const NewPaymentForm = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onClose, reloadData } = props;

  const [formFields, setFormFields] = useState({
    date: "",
    type: "",
    paymentType: "",
    amount: "",
    accountNum: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        dt: moment(formFields.date).format("YYYY-MM-DD hh:mm"),
        type_id: formFields.type,
        payment_type: formFields.paymentType,
        amount: formFields.amount,
        note: formFields.notes,
        account_number: formFields.accountNum,
      },
    };
    PatientPortalService.createBilling(reqBody).then((response) => {
      enqueueSnackbar(`${response.message}`, { variant: "success" });
      reloadData();
      onClose();
    });
  };

  return (
    <Dialog
      open={isOpen}
      title={" "}
      message={(
        <>
          <Grid container justify="space-between">
            <Typography variant="h3" color="textSecondary">
              Process Payment
            </Typography>
          </Grid>
          <form onSubmit={onFormSubmit}>

            <Grid className={classes.inputRow}>
              <Typography
                className={classes.customLabel}
                color="textSecondary"
                gutterBottom
              >
                Use existing payment method
              </Typography>
              <Typography
                className={classes.gutterBottom}
                color="textSecondary"
                gutterBottom
              >
                Visa 0043
              </Typography>
              <Typography
                className={classes.gutterBottom}
                color="textSecondary"
                gutterBottom
              >
                MasterCard 0222
              </Typography>
              <Typography
                className={classes.gutterBottom}
                color="textSecondary"
                gutterBottom
              >
                Checking 0111
              </Typography>
            </Grid>

            <Typography className={classes.customLabel} color="textSecondary">
              New Payment Method
            </Typography>
            <Grid className={classes.gutterBottom} item lg={4}>
              <TextField
                variant="outlined"
                name="notes"
                id="notes"
                type="number"
                label="Amount"
                size="small"
                required
                fullWidth
                value={formFields.notes}
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>

            <Grid container className={classes.buttonsContainer} justify="space-between">
              <Button variant="outlined" type="submit">
                Process Payment
              </Button>
              <Button variant="outlined" onClick={() => onClose()}>
                Cancel
              </Button>
            </Grid>
          </form>
        </>
      )}
      cancelForm={() => onClose()}
      hideActions
      size="sm"
    />
  );
};

NewPaymentForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default NewPaymentForm;
