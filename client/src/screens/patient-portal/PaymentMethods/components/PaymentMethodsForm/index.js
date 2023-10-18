import React, { useEffect, useState, useCallback } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { CountryRegionData } from "react-country-region-selector";

import CountrySelect from "../../../../../components/common/CountrySelect";
import MaskInput from "../../../../../components/common/MaskInput";
import RegionSelect from "../../../../../components/common/RegionSelect";
import useAuth from "../../../../../hooks/useAuth";
import useDidMountEffect from "../../../../../hooks/useDidMountEffect";
import PatientPortalService from "../../../../../services/patient_portal/patient-portal.service";
import PaymentMethodService from "../../../../../services/patient_portal/payment-method.service";
import { paymentMethodType } from "../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    minHeight: 53,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    padding: theme.spacing(1),
  },
  formContainer: {
    margin: theme.spacing(1, 0),
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
    marginBottom: theme.spacing(2),
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
  buttonsContainer: {
    margin: theme.spacing(3, 0),
  },
}));

const PaymentMethodsForm = (props) => {
  const classes = useStyles();
  const { user } = useAuth();
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
    address: "",
    address2: "",
    city: "",
    postal: "",
  });

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const selectedCountry = CountryRegionData.filter(
      (countryArray) => countryArray[1] === formFields.country,
    );
    if (selectedCountry.length) { // country and state is present in the db
      setCountry(selectedCountry[0]);
      const regions = selectedCountry[0][2].split("|").map((regionPair) => {
        const [regionName = null, regionInShort] = regionPair.split("~");
        return [regionName, regionInShort];
      });
      const selectedRegion = regions.filter((x) => x[1] === formFields.state);
      setRegion(selectedRegion[0][1]);
    }
  }, [formFields]);

  const fetchProfile = useCallback(() => {
    PatientPortalService.getProfile().then((res) => {
      const profile = res.data?.[0];
      setFormFields((formFieldValues) => ({
        ...formFieldValues,
        ...profile,
      }));
    });
  }, []);


  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateFields = () => {
    formFields.cardType = paymentMethodType(cardData.type);
    if (isEdit) {
      formFields.cardNumber = `____/____/____/${cardData.account_number}`;
    } else {
      formFields.cardNumber = cardData.account_number;
    }
    formFields.expiryDate = cardData.exp;
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

  const handleCountryRegion = (identifier, value) => {
    if (identifier === "country") {
      setCountry(value);
    } else if (identifier === "region") {
      setRegion(value);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const reqBody = {
      data: {
        exp: formFields.expiryDate.replace("/", ""),
        // type: formFields.cardType[0] || "C",
        type: "C",
        cvc: formFields.cvv,
        account_number: formFields.cardNumber.replaceAll("/", ""),
        stripe_customer_id: user.stripe_customer_id,
        corp_stripe_customer_id: user.corp_stripe_customer_id,
        address: formFields.address,
        address2: formFields.address2,
        city: formFields.city,
        postal: formFields.postal,
        country: country[1],
        state: region,
      },
    };
    if (isEdit) {
      const paymentMethodId = cardData.id;
      const updateFormData = {
        ...reqBody,
        data: {
          ...reqBody.data,
          corp_stripe_payment_method_token: cardData.corp_stripe_payment_method_token,
          stripe_payment_method_token: cardData.stripe_payment_method_token,
        },
      };
      PaymentMethodService.updatePaymentMethod(paymentMethodId, updateFormData)
        .then((response) => {
          enqueueSnackbar(`${response.message}`, { variant: "success" });
          reloadData();
          onClose();
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      PaymentMethodService.createPaymentMethod(reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.message}`, { variant: "success" });
          reloadData();
          setIsLoading(false);
          onClose();
        })
        .catch(() => {
          setIsLoading(false);
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
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        {`${isEdit ? "Edit" : "Add"} Payment Method`}
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
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
            <Grid className={classes.formContainer}>
              <Grid>
                <MaskInput
                  required
                  fullWidth
                  autoFocus={!isEdit}
                  disabled={isEdit}
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
                  disabled={isEdit}
                  variant="outlined"
                  margin="dense"
                  name="cvv"
                  id="cvv"
                  type="text"
                  label="CVV"
                  className={classes.gutterBottom}
                  value={formFields.cvv}
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>

              <Grid>
                <MaskInput
                  required
                  autoFocus={isEdit}
                  className={classes.gutterBottom}
                  type="text"
                  name="expiryDate"
                  label="Expiration"
                  margin="dense"
                  variant="outlined"
                  value={formFields.expiryDate}
                  mask="99/99"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid>
                <TextField
                  className={classes.gutterBottom}
                  label="Address"
                  name="address"
                  value={formFields.address}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid>
                <TextField
                  className={classes.gutterBottom}
                  label="Address Line 2"
                  name="address2"
                  value={formFields.address2}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid>
                <TextField
                  className={classes.gutterBottom}
                  label="City"
                  name="city"
                  value={formFields.city}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid>
                <TextField
                  className={classes.gutterBottom}
                  label="Zip/Postal"
                  name="postal"
                  value={formFields.postal}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid>
                <CountrySelect
                  id="country-select"
                  error={null}
                  name="country-select"
                  helperText=""
                  label="Country"
                  handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                  country={country}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid>
                <RegionSelect
                  id="state-select"
                  error={null}
                  name="state-select"
                  helperText=""
                  label="State"
                  handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                  country={country}
                  region={region}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid container className={classes.buttonsContainer} justify="space-between">
              <Button color="primary" variant="outlined" type="submit">
                {`${isEdit ? "Edit" : "Add"} Method`}
              </Button>
            </Grid>
          </form>
        </div>
      </DialogContent>
    </Dialog>
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
    corp_stripe_payment_method_token: PropTypes.string,
    stripe_payment_method_token: PropTypes.string,
  }),
};

export default PaymentMethodsForm;
