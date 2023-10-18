import React, { useEffect, useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import MaskInput from "../../../../../../components/common/MaskInput";
import Dialog from "../../../../../../components/Dialog";
import useDidMountEffect from "../../../../../../hooks/useDidMountEffect";
import usePatientContext from "../../../../../../hooks/usePatientContext";
import PatientService from "../../../../../../services/patient.service";
import { paymentMethodType } from "../../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  formContainer: {
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

const PaymentMethodsForm = (props) => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { patientId, patientInfo } = state;
  const { enqueueSnackbar } = useSnackbar();
  const {
    isOpen, onClose, reloadData, cardData,
  } = props;
  const isEdit = Boolean(cardData);

  const [formFields, setFormFields] = useState({
    cardType: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const updateFields = () => {
    formFields.cardType = paymentMethodType(cardData.type);
    formFields.cardNumber = cardData.account_number;
    // formFields.cvv = cardData.account_number;
    formFields.expiryDate = moment(cardData.exp).format("MM-YY");
    setFormFields({ ...formFields });
  };

  useEffect(() => {
    if (cardData) {
      updateFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData]);

  const updateFormState = (key, value) => {
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    updateFormState(name, value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        exp: formFields.expiryDate.replace("/", ""),
        type: formFields.cardType[0] || "C",
        account_number: formFields.cardNumber.replaceAll("/", ""),
        cvc: formFields.cvv,
        customer_id: patientInfo.data.stripe_customer_id,
      },
    };

    if (isEdit) {
      const paymentMethodId = cardData.id;
      PatientService.updatePaymentMethod(patientId, paymentMethodId, reqBody).then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        reloadData();
        onClose();
      });
    } else {
      PatientService.createPaymentMethod(patientId, reqBody).then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        reloadData();
        onClose();
      });
    }
  };

  const getCardType = () => {
    const { cardNumber } = formFields;
    const cardFirstDigit = cardNumber[0];
    const cardType = "cardType";

    if (cardFirstDigit === "3") {
      updateFormState(cardType, "American Express");
    } else if (cardFirstDigit === "4") {
      updateFormState(cardType, "Visa");
    } else if (cardFirstDigit === "5") {
      updateFormState(cardType, "Master");
    } else {
      updateFormState(cardType, "");
    }
  };

  useDidMountEffect(() => {
    getCardType();
  }, [formFields.cardNumber]);

  return (
    <Dialog
      open={isOpen}
      title={" "}
      message={(
        <>
          <Typography variant="h3" color="textSecondary">
            {`${isEdit ? "Edit" : "Add"} Payment Method`}
          </Typography>
          <form onSubmit={onFormSubmit}>
            <Grid className={classes.formContainer}>
              <Grid>
                <MaskInput
                  required
                  className={classes.gutterBottom}
                  type="text"
                  name="cardNumber"
                  label="Card Number"
                  margin="dense"
                  variant="outlined"
                  value={formFields.cardNumber}
                  mask="9999/9999/9999/9999"
                  onChange={(e) => handleInputChange(e)}
                />
                {!!formFields.cardType && formFields.cardType.length ? (
                  <Typography gutterBottom>{formFields.cardType}</Typography>
                )
                  : null}
              </Grid>

              <Grid>
                <TextField
                  required
                  variant="outlined"
                  margin="dense"
                  name="cvv"
                  id="cvv"
                  type="number"
                  label="CVV"
                  className={classes.gutterBottom}
                  value={formFields.cvv}
                  onChange={(e) => handleInputChange(e)}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 3);
                  }}
                />
              </Grid>

              <Grid>
                <MaskInput
                  required
                  className={classes.gutterBottom}
                  type="text"
                  name="expiryDate"
                  label="Validity"
                  margin="dense"
                  variant="outlined"
                  value={formFields.expiryDate}
                  mask="99/99"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.buttonsContainer} justify="space-between">
              <Button variant="outlined" type="submit">
                {`${isEdit ? "Edit" : "Add"} Method`}
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
      size="xs"
    />
  );
};

PaymentMethodsForm.defaultProps = {
  cardData: null,
};

PaymentMethodsForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
  cardData: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    exp: PropTypes.string,
    account_number: PropTypes.string,
  }),
};

export default PaymentMethodsForm;
