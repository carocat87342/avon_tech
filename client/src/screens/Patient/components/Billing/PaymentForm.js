import React, { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import usePatientContext from "../../../../hooks/usePatientContext";
import { togglePaymentDialog } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";
import { paymentMethodType } from "../../../../utils/helpers";
import PaymentMethodsForm from "../BasicInfo/components/PaymentMethodsForm";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  amountContainer: {
    marginLeft: "0px !important",
  },
  formInput: {
    marginBottom: theme.spacing(1),
  },
  textButton: {
    cursor: "pointer",
    padding: "3px 0px",
    "&:hover": {
      backgroundColor: "#f1f1f1 !important",
    },
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

const PaymentForm = (props) => {
  const { reloadData, reloadPaymentMethods } = props;
  const classes = useStyles();
  const { state, dispatch } = usePatientContext();
  const { enqueueSnackbar } = useSnackbar();

  const { patientId } = state;
  const paymentMethodsData = state.patientInfo.paymentMethods || [];

  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (selectedAccount) {
      const reqBody = {
        data: {
          dt: moment().format("YYYY-MM-DD hh:mm"),
          type_id: 3,
          payment_type: "C",
          account_number: selectedAccount.account_number,
          amount,
        },
      };
      PatientService.createBilling(patientId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(togglePaymentDialog());
        });
    } else {
      enqueueSnackbar(`Select account number`, { variant: "error" });
    }
  };

  const toggleNewPaymentMethodDialog = () => {
    setShowPaymentMethodForm((prevState) => !prevState);
  };

  return (
    <>
      <PaymentMethodsForm
        isOpen={showPaymentMethodForm}
        onClose={toggleNewPaymentMethodDialog}
        reloadData={reloadPaymentMethods}
        cardData={null}
      />
      <Typography variant="h3" color="textSecondary" gutterBottom>
        Process Payment
      </Typography>
      <form onSubmit={onFormSubmit}>
        <Grid className={classes.inputRow}>
          <Typography
            className={classes.formInput}
            variant="h4"
            color="textPrimary"
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

            <Box mb={3} mt={1}>
              <Typography
                variant="h5"
                color="textPrimary"
                gutterBottom
                className={classes.textButton}
                onClick={() => toggleNewPaymentMethodDialog()}
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
              />
            </Box>
          </Grid>

          <Button
            variant="outlined"
            size="large"
            type="submit"
          >
            Process Payment
          </Button>
        </Grid>
      </form>
    </>
  );
};

PaymentForm.propTypes = {
  reloadData: PropTypes.func.isRequired,
  reloadPaymentMethods: PropTypes.func.isRequired,
};

export default PaymentForm;
