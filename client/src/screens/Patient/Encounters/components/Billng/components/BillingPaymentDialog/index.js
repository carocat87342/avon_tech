import React, { useState } from "react";

import {
  Box, Typography, Grid, Button, TextField, List, ListItem, ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../../../../components/Dialog";
import usePatientContext from "../../../../../../../hooks/usePatientContext";
import PatientService from "../../../../../../../services/patient.service";
import { paymentMethodType } from "../../../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  minWidth100: {
    minWidth: 100,
  },
  selected: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    padding: 5,
    cursor: "pointer",
  },
  listItem: {
    border: `2px solid transparent`,
    padding: 5,
    cursor: "pointer",
  },
}));

const BillingPayment = (props) => {
  const { open, onClose, reloadData } = props;
  const classes = useStyles();
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);

  const { state } = usePatientContext();
  const { enqueueSnackbar } = useSnackbar();

  const { patientId } = state;
  const encounterId = state.encounters.selectedEncounter?.id || 1;
  const paymentMethodsData = state.patientInfo.paymentMethods || [];

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (selectedAccount) {
      const reqBody = {
        data: {
          account_number: selectedAccount.account_number,
          dt: moment().format("YYYY-MM-DD hh:mm"),
          type_id: 3,
          payment_type: "C",
          amount,
        },
      };
      PatientService.createEncountersBillingPayments(patientId, encounterId, reqBody).then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        reloadData();
        onClose();
      });
    } else {
      enqueueSnackbar(`Select account number`, { variant: "error" });
    }
    e.stopPropagation(); // to prevent encounters main form submission
  };

  return (
    <Dialog
      open={open}
      message={(
        <form
          onSubmit={onFormSubmit}
          id="payments-form"
        >
          <Typography variant="h3">
            Process Payment
          </Typography>

          <Box mt={3}>
            <Typography
              variant="h5"
              gutterBottom
            >
              Use existing payment method
            </Typography>
            <Grid item lg={6}>
              <List component="ul">
                {
                  paymentMethodsData.length
                    ? paymentMethodsData.map((item) => {
                      const isItemSelected = !!selectedAccount && selectedAccount.id === item.id;
                      return (
                        <ListItem
                          key={item.id}
                          disableGutters
                          button
                          onClick={() => setSelectedAccount(item)}
                          className={isItemSelected ? classes.selected : classes.listItem}
                        >
                          <ListItemText primary={`${paymentMethodType(item.type)} ${item.account_number}`} />
                        </ListItem>
                      );
                    })
                    : (
                      <Typography
                        className={classes.formInput}
                        variant="h5"
                        color="textPrimary"
                        gutterBottom
                      >
                        No payment methods available...
                      </Typography>
                    )
                }
              </List>
            </Grid>
            {/* <Typography gutterBottom>Visa 0043</Typography>
            <Typography gutterBottom>Master Card 0222</Typography>
            <Typography gutterBottom>Checking 0111</Typography> */}
          </Box>

          <Box mb={3} mt={3}>
            <Typography
              variant="h5"
              color="textSecondary"
              gutterBottom
            >
              New Payment method
            </Typography>
            <TextField
              required
              type="number"
              margin="dense"
              variant="outlined"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={classes.minWidth100}
            />
          </Box>

          <Grid
            container
            justify="space-between"
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
              type="submit"
              form="payments-form"
            >
              Process Payment
            </Button>
          </Grid>
        </form>
      )}
      cancelForm={onClose}
      hideActions
      size="xs"
    />
  );
};

BillingPayment.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default BillingPayment;
