import React, { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../components/Dialog";
import useAuth from "../../../../hooks/useAuth";
import PatientPortalService from "../../../../services/patient_portal/patient-portal.service";
import { TransactionFormFields } from "../../../../static/transactionForm";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  formInput: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
  },
}));

const NewTransactionForm = (props) => {
  const classes = useStyles();
  const { lastVisitedPatient } = useAuth();
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
        patient_id: lastVisitedPatient.id,
        client_id: lastVisitedPatient.client_id,
        type_id: formFields.type,
        payment_type: formFields.paymentType,
        amount: formFields.amount,
        note: formFields.notes,
        account_number: formFields.accountNum,
      },
    };
    PatientPortalService.createBilling(reqBody)
      .then((response) => {
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
              New Transaction
            </Typography>
          </Grid>
          <form onSubmit={onFormSubmit}>
            <Grid className={classes.inputRow}>
              {TransactionFormFields.map((item) => (
                <Grid
                  key={item.name}
                  container
                  alignItems="center"
                  className={classes.formInput}
                >
                  <Grid item lg={2}>
                    <label htmlFor={item.label} variant="h4" color="textSecondary">
                      {item.label}
                    </label>
                  </Grid>
                  <Grid item md={4}>
                    {item.baseType === "input" ? (
                      <TextField
                        variant="standard"
                        name={item.name}
                        id={item.id}
                        type={item.type}
                        required
                        fullWidth
                        value={formFields[item.name]}
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      <TextField
                        select
                        placeholder={item.label}
                        id={item.id}
                        name={item.name}
                        value={formFields[item.name]}
                        required
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      >
                        {item.options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Grid>
                </Grid>
              ))}
              <Grid className={classes.formInput} item lg={2}>
                <Typography className={classes.customLabel} color="textSecondary">
                  Notes
                </Typography>
              </Grid>
              <Grid item md={12}>
                <TextField
                  variant="outlined"
                  name="notes"
                  id="notes"
                  type="text"
                  required
                  fullWidth
                  value={formFields.notes}
                  onChange={(e) => handleInputChange(e)}
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>

            <Grid container justify="space-between">
              <Button
                variant="outlined"
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </>
      )}
      cancelForm={() => onClose()}
      hideActions
      size="md"
    />
  );
};

NewTransactionForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default NewTransactionForm;
