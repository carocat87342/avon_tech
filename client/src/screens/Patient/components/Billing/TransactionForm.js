import React, {
  useEffect, useState, useCallback, useMemo,
} from "react";

import {
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import clsx from "clsx";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../../components/Alert";
import useDidMountEffect from "../../../../hooks/useDidMountEffect";
import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleNewTransactionDialog, resetBilling } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";
import { TransactionFormFields, TransactionTypes } from "../../../../static/transactionForm";
import { convertTransactionTypes, pickerDateFormat } from "../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  formInput: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
    margin: theme.spacing(1, 0),
  },
  circularProgress: {
    position: "absolute",
    textAlign: "center",
    left: "50%",
  },
  modalConentBelow: { opacity: "1" },
  contentWithLoading: {
    opacity: "0.5",
  },
  m2: {
    margin: theme.spacing(2, 0),
  },
  menuOption: {
    minHeight: 26,
  },
}));

const NewTransactionForm = (props) => {
  const classes = useStyles();
  const { reloadData } = props;
  const { state, dispatch } = usePatientContext();
  const { patientId, patientInfo } = state;
  const { enqueueSnackbar } = useSnackbar();

  const [isNegativeAmount, setIsNegativeAmount] = useState(false);
  const [hasAmountError, setHasAmountError] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  // const [transactionTypes, setTransactionTypes] = useState([...TransactionTypes]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    date: new Date(),
    type: "",
    paymentType: "",
    amount: "",
    accountNum: "",
    notes: "",
  });
  const transactionTypes = [...TransactionTypes];
  const { selectedBilling } = state.billing;

  useDidMountEffect(() => {
    if (selectedBilling) { // only for edit billing dialog
      // eslint-disable-next-line max-len
      const selectedAccountNumber = paymentOptions.find((p) => p.account_number === selectedBilling.account_number);
      if (selectedAccountNumber) {
        const name = "accountNum";
        setFormFields({
          ...formFields,
          [name]: selectedAccountNumber.id,
        });
      }
    }
  }, [paymentOptions]);

  const updateFields = () => {
    if (selectedBilling.amount < 0) {
      setIsNegativeAmount(true);
    }
    formFields.date = pickerDateFormat(selectedBilling.dt);
    formFields.type = convertTransactionTypes(selectedBilling.tran_type);
    formFields.paymentType = selectedBilling.payment_type;
    formFields.amount = Math.abs(selectedBilling?.amount);
    formFields.notes = selectedBilling.note;
    setFormFields({ ...formFields });
  };

  useEffect(() => {
    if (selectedBilling) {
      updateFields();
    }
    return () => !!selectedBilling && dispatch(resetBilling());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBilling]);

  // const fetchBillingTransactionTypes = useCallback(() => {
  //   PatientService.getBillingTransactionTypes(patientId).then((res) => {
  //     setTransactionTypes(res.data);
  //   });
  // }, [patientId]);

  const fetchBillingPaymentOptions = useCallback(() => {
    PatientService.getBillingPaymentOptions(patientId).then((res) => {
      setPaymentOptions(res.data);
    });
  }, [patientId]);

  useEffect(() => {
    fetchBillingPaymentOptions();
  }, [fetchBillingPaymentOptions]);

  const createBilling = () => {
    if (+formFields.amount > 0) { /* shorthand to convert string => number */
      setIsLoading(true);
      const selectedPaymentMethod = paymentOptions.filter((p) => p.id === formFields.accountNum);
      const reqBody = {
        data: {
          dt: moment(formFields.date).format("YYYY-MM-DD hh:mm"),
          type_id: formFields.type,
          amount: isNegativeAmount ? -formFields.amount : formFields.amount,
          note: formFields.notes,
          payment_method_id: (formFields.accountNum !== "") ? formFields.accountNum : null,
          stripe_payment_method_token: selectedPaymentMethod[0]?.stripe_payment_method_token,
          customer_id: patientInfo.data.stripe_customer_id,
        },
      };

      if (selectedBilling) { // edit scenario
        const billingId = selectedBilling.id;
        PatientService.updateBilling(patientId, billingId, reqBody)
          .then((response) => {
            enqueueSnackbar(`${response.message}`, { variant: "success" });
            reloadData();
            setIsLoading(false);
            dispatch(toggleNewTransactionDialog());
          })
          .catch(() => {
            setIsLoading(false);
          });
      } else {
        PatientService.createBilling(patientId, reqBody)
          .then((response) => {
            enqueueSnackbar(`${response.data.message}`, { variant: "success" });
            reloadData();
            setIsLoading(false);
            dispatch(toggleNewTransactionDialog());
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
    } else {
      setHasAmountError(true);
    }
  };

  const openConfirmationDialog = () => {
    setShowConfirmationDialog((prevstate) => !prevstate);
  };

  const closeConfirmationDialog = () => {
    setShowConfirmationDialog((prevstate) => !prevstate);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // As per CLIN-148 condition-1
    if (!selectedBilling && (formFields.type === 3 || formFields.type === 4)) {
      openConfirmationDialog();
    } else {
      createBilling();
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (name === "type" && (value === 3 || value === 4) && formFields.paymentType === "") {
      formFields.paymentType = "C";
    }
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const name = "date";
    setFormFields({
      ...formFields,
      [name]: date,
    });
  };

  const renderOptionsForDropdowns = (value) => {
    const blankItem = {
      id: "",
      name: "",
      account_number: null,
      type: null,
      stripe_payment_method_token: null,
    };
    const paymentTypeSelectOptionsMutated = [blankItem, ...paymentOptions];
    switch (value) {
      case "transactionTypes": {
        const transactionTypeSelectOptions = transactionTypes.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ));
        return transactionTypeSelectOptions;
      }
      case "paymentOptions": {
        const paymentTypeSelectOptions = paymentTypeSelectOptionsMutated.map((option) => (
          <MenuItem className={classes.menuOption} key={option.id} value={option.id}>
            {option.account_number ? `${option.account_number} - ${option.type}` : ""}
          </MenuItem>
        ));
        return paymentTypeSelectOptions;
      }
      default:
        return <div />;
    }
  };

  // selecting the first transaction type by default for new billing dialog
  useEffect(() => {
    if (selectedBilling === null) { // only for new billing dialog
      const name = "type";
      setFormFields((prevState) => ({
        ...prevState,
        [name]: 3, // PAYMENT id is 3.
      }));
    }
  }, [selectedBilling]);

  useDidMountEffect(() => {
    if (hasAmountError) {
      setHasAmountError(false);
    }
  }, [formFields.amount]);

  // selecting the first payment method by default for new billing dialog
  useDidMountEffect(() => {
    const name = "accountNum";
    if (selectedBilling === null && (formFields.type === 3 || formFields.type === 4)) {
      setFormFields({
        ...formFields,
        [name]: paymentOptions[0]?.id,
      });
    } else if (formFields.type !== 3 || formFields.type !== 4) {
      setFormFields({
        ...formFields,
        [name]: "",
      });
    }
  }, [formFields.type, paymentOptions]);

  const checkIfRequired = useCallback((field) => {
    if (field === "accountNum") {
      if (formFields.paymentType === "C" || formFields.paymentType === "A") {
        return true;
      }
      return false;
    }
    if (field === "paymentType") {
      if (formFields.type === 3 || formFields.type === 4) {
        return true;
      }
      return false;
    }
    return true;
  }, [formFields.paymentType, formFields.type]);

  const checkIfDisabled = useMemo(() => {
    const paymentType = selectedBilling?.payment_type;
    // only for editing
    if (selectedBilling && (paymentType === "C" || paymentType === "CH")) {
      return true;
    }
    return false;
  }, [selectedBilling]);

  const isPaymentMethodRequired = useMemo(() => {
    const transactionType = formFields.type;
    if (transactionType === 3 || transactionType === 4) {
      return true; // required
    }
    return false; // not required
  }, [formFields.type]);

  return (
    <>
      <Alert
        open={showConfirmationDialog}
        title="Confirmation"
        message="Are you sure you want to create this payment?"
        applyButtonText="Continue"
        cancelButtonText="Cancel"
        applyForm={createBilling}
        cancelForm={closeConfirmationDialog}
      />
      {isLoading && (
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      )}
      <div
        className={clsx({
          [classes.modalConentBelow]: true, // always apply
          [classes.contentWithLoading]: isLoading, // only when isLoading === true
        })}
      >
        <form onSubmit={onFormSubmit}>
          <Grid item md={4} className={classes.formInput}>
            <KeyboardDatePicker
              key="date"
              margin="dense"
              inputVariant="outlined"
              name="date"
              id="date"
              format="MMM dd yyyy"
              label="Date"
              value={formFields.date}
              onChange={handleDateChange}
              fullWidth
              required
              // As per CLIN-148 condition-2
              disabled={checkIfDisabled || (formFields.type === 3 || formFields.type === 4)}
            />
          </Grid>
          {TransactionFormFields.map((item) => (
            <Grid
              key={item.name}
              container
              alignItems="center"
              className={classes.formInput}
            >
              <Grid item md={4} xs={12}>
                {item.baseType === "input" ? (
                  <TextField
                    variant="outlined"
                    margin="dense"
                    label={item.label}
                    name={item.name}
                    id={item.id}
                    type={item.type}
                    required
                    fullWidth
                    value={formFields[item.name]}
                    onChange={(e) => handleInputChange(e)}
                    error={item.name === "amount" ? hasAmountError : false}
                    helperText={hasAmountError && "Amount should be greater than 0"}
                    disabled={checkIfDisabled}
                  />
                ) : (
                  <TextField
                    select
                    variant="outlined"
                    margin="dense"
                    label={item.label}
                    id={item.id}
                    name={item.name}
                    value={formFields[item.name]}
                    required={
                      item.name === "accountNum" ? isPaymentMethodRequired : checkIfRequired(item.name)
                    }
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                    disabled={checkIfDisabled}
                  >
                    {!!item.options && item.options.length ? item.options.map((option) => (
                      <MenuItem className={classes.menuOption} key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                    : renderOptionsForDropdowns(item.id)}
                  </TextField>
                )}
              </Grid>
            </Grid>
          ))}
          <Grid item md={12} className={classes.m2}>
            <TextField
              variant="outlined"
              name="notes"
              label="Notes"
              type="text"
              fullWidth
              value={formFields.notes}
              onChange={(e) => handleInputChange(e)}
              multiline
              rows={5}
            />
          </Grid>

          <Grid container justify="space-between">
            <Button
              variant="outlined"
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

NewTransactionForm.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default NewTransactionForm;
